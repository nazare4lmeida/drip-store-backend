const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models/User');
const Product = require('../src/models/Product'); // Importamos o modelo para buscar o ID

let token;
let categoryId;
let productId; // Vamos definir o productId no escopo principal

beforeAll(async () => {
  await sequelize.sync({ force: true });
  
  await request(app).post('/v1/usuario').send({
      firstname: 'Test', surname: 'Prod', email: 'admin.prod@example.com',
      password: 'password123', confirmPassword: 'password123',
  });

  const tokenRes = await request(app).post('/v1/usuario/token').send({
      email: 'admin.prod@example.com', password: 'password123',
  });
  token = tokenRes.body.token;

  // Cria uma categoria para poder associar ao produto
  await request(app).post('/v1/categoria').set('Authorization', `Bearer ${token}`)
    .send({ nome: 'Calçados', slug: 'calcados' });
  
  const searchRes = await request(app).get('/v1/categoria/pesquisa?fields=id');
  categoryId = searchRes.body.data[0].id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product API', () => {
  const testProduct = {
    nome: "Tênis de Corrida",
    slug: "tenis-corrida-01",
    description: "Um ótimo tênis para corredores.",
    preco: 299.90,
    price_with_discount: 249.90,
    stock: 50,
    enabled: true,
    category_ids: [],
    options: [
      { title: "Cor", type: "cor", values: ["#FFFFFF", "#000000"] },
      { title: "Tamanho", type: "texto", value: ["39", "40", "41", "42"] }
    ]
  };

  it('should create a new product with categories and options', async () => {
    testProduct.category_ids = [categoryId];

    const res = await request(app)
      .post('/v1/produto')
      .set('Authorization', `Bearer ${token}`)
      .send(testProduct);
    
    expect(res.statusCode).toEqual(201);
    
    // **CORREÇÃO IMPORTANTE:** Após criar, buscamos o ID diretamente no banco
    // para garantir que o temos para os próximos testes, sem depender de buscas.
    const createdProduct = await Product.findOne({ where: { slug: testProduct.slug } });
    expect(createdProduct).toBeDefined();
    productId = createdProduct.id; // Salvamos o ID na variável global do teste
  });
  
  it('should get the created product by ID', async () => {
    // Agora usamos o productId que garantimos ter no teste anterior
    expect(productId).toBeDefined(); // Garante que o teste anterior funcionou

    const res = await request(app).get(`/v1/produto/${productId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toBe(testProduct.nome);
    expect(res.body.options.length).toBe(2);
    expect(res.body.category_ids).toContain(categoryId);
  });

  it('should update a product and its associations', async () => {
    // Usamos o productId novamente
    expect(productId).toBeDefined(); 

    // Primeiro, pegamos os dados atuais do produto para saber o ID da opção
    const currentProduct = await request(app).get(`/v1/produto/${productId}`);
    const firstOptionId = currentProduct.body.options[0].id;

    const updatePayload = {
      preco: 289.90,
      stock: 45,
      options: [
        { id: firstOptionId, deleted: true }, // Deleta a opção de Cor
        { title: "Material", type: "texto", values: ["Sintético"] } // Adiciona uma nova opção
      ]
    };

    const res = await request(app)
      .put(`/v1/produto/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatePayload);

    expect(res.statusCode).toEqual(204);

    // Verifica se a atualização funcionou
    const updatedProduct = await request(app).get(`/v1/produto/${productId}`);
    expect(updatedProduct.body.preco).toBe(289.90);
    expect(updatedProduct.body.options.length).toBe(2); // Deletou 1, adicionou 1
    expect(updatedProduct.body.options.find(opt => opt.titulo === 'Material')).toBeDefined();
  });
});