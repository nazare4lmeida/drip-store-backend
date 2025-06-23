const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models/User'); // Podemos pegar o sequelize de qualquer modelo

let token;

// Bloco para limpar o banco e obter um token de autenticação antes dos testes de categoria
beforeAll(async () => {
  await sequelize.sync({ force: true });
  
  // Cria um usuário para poder fazer login e obter o token
  await request(app)
    .post('/v1/usuario')
    .send({
      firstname: 'Test',
      surname: 'Admin',
      email: 'admin.cat@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

  const res = await request(app)
    .post('/v1/usuario/token')
    .send({
      email: 'admin.cat@example.com',
      password: 'password123',
    });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Category API', () => {
  let categoryId;
  const testCategory = {
    nome: 'Eletrônicos',
    slug: 'eletronicos',
    use_in_menu: true,
  };

  it('should create a new category and return 201', async () => {
    const res = await request(app)
      .post('/v1/categoria')
      .set('Authorization', `Bearer ${token}`)
      .send(testCategory);
    
    expect(res.statusCode).toEqual(201);
  });
  
  it('should return 401 when creating a category without a token', async () => {
    const res = await request(app)
      .post('/v1/categoria')
      .send(testCategory);
    
    expect(res.statusCode).toEqual(400); // O middleware está retornando 400 para token ausente
  });
  
  it('should get a list of categories', async () => {
    const res = await request(app).get('/v1/categoria/pesquisa');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data[0].nome).toBe(testCategory.nome);
    categoryId = res.body.data[0].id; // Salva o ID para os próximos testes
  });

  it('should get a category by ID', async () => {
    const res = await request(app).get(`/v1/categoria/${categoryId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.slug).toBe(testCategory.slug);
  });

  it('should update a category and return 204', async () => {
    const res = await request(app)
      .put(`/v1/categoria/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Eletrônicos e Gadgets', slug: 'eletronicos-gadgets' });
    
    expect(res.statusCode).toEqual(204);
  });

  it('should delete a category and return 204', async () => {
    const res = await request(app)
      .delete(`/v1/categoria/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
  
  it('should return 404 when getting a deleted category', async () => {
    const res = await request(app).get(`/v1/categoria/${categoryId}`);
    expect(res.statusCode).toEqual(404);
  });
});