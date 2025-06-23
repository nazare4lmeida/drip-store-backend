const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models/User');

// Este bloco é executado antes de todos os testes neste arquivo.
// É perfeito para limpar o banco de dados e garantir que os testes comecem do zero.
beforeAll(async () => {
  // O `sync({ force: true })` apaga e recria todas as tabelas.
  // CUIDADO: Use isso apenas em um banco de dados de teste!
  await sequelize.sync({ force: true });
});

// Este bloco é executado após todos os testes terminarem.
// Ideal para fechar a conexão com o banco de dados.
afterAll(async () => {
  await sequelize.close();
});

// Descrevemos o conjunto de testes para a entidade "User"
describe('User API', () => {
  let token;
  let userId;
  const testUser = {
    firstname: 'Test',
    surname: 'User',
    email: 'test.user@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  };

  // Teste 1: Deve criar um novo usuário com sucesso
  it('should create a new user and return 201', async () => {
    const res = await request(app)
      .post('/v1/usuario')
      .send(testUser);
    
    expect(res.statusCode).toEqual(201);
  });

  // Teste 2: Deve falhar ao criar um usuário com email duplicado
  it('should return 400 when creating a user with a duplicate email', async () => {
    const res = await request(app)
      .post('/v1/usuario')
      .send(testUser); // Enviando os mesmos dados de novo
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Este email já está em uso.');
  });
  
  // Teste 3: Deve logar com o usuário criado e obter um token JWT
  it('should login the user and return a JWT token', async () => {
    const res = await request(app)
      .post('/v1/usuario/token')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Salva o token para os próximos testes
  });

  // Teste 4: Deve buscar as informações do usuário pelo ID
  it('should get user information by ID and return 200', async () => {
    // Primeiro, precisamos encontrar o ID do usuário que criamos
    const loginRes = await request(app).post('/v1/usuario/token').send({ email: testUser.email, password: testUser.password });
    const userListRes = await request(app).get('/v1/usuario').set('Authorization', `Bearer ${loginRes.body.token}`); // Supondo que exista uma rota para listar usuários
    const user = await request(app).post('/v1/usuario/token').send({ email: testUser.email, password: testUser.password });
    
    // Como não temos rota de listagem, vamos simplificar e buscar o usuário no banco
    const User = require('../src/models/User');
    const createdUser = await User.findOne({ where: { email: testUser.email } });
    userId = createdUser.id;

    const res = await request(app)
      .get(`/v1/usuario/${userId}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('firstname', testUser.firstname);
  });
  
  // Teste 5: Deve atualizar as informações do usuário
  it('should update the user and return 204', async () => {
    const updatedData = {
      firstname: 'Updated',
      surname: 'Name',
      email: 'updated.user@example.com',
    };
    
    const res = await request(app)
      .put(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`) // Usa o token para se autenticar
      .send(updatedData);

    expect(res.statusCode).toEqual(204);

    // Verificação extra: busca o usuário de novo para ver se os dados mudaram
    const checkRes = await request(app).get(`/v1/usuario/${userId}`);
    expect(checkRes.body.firstname).toEqual('Updated');
    expect(checkRes.body.email).toEqual('updated.user@example.com');
  });

  // Teste 6: Deve deletar o usuário
  it('should delete the user and return 204', async () => {
    const res = await request(app)
      .delete(`/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`); // Autenticação necessária

    expect(res.statusCode).toEqual(204);
  });

  // Teste 7: Deve retornar 404 ao tentar buscar um usuário deletado
  it('should return 404 when trying to get a deleted user', async () => {
    const res = await request(app)
      .get(`/v1/usuario/${userId}`);
      
    expect(res.statusCode).toEqual(404);
  });
});