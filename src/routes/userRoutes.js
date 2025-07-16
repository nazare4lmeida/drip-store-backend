const { Router } = require('express');
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/auth');

const router = Router();

/**
 * @swagger
 * /usuario/token:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Autentica um usuário e retorna um token JWT.
 *     description: Realiza o login do usuário com email e senha para obter um token de acesso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       '200':
 *         description: 'Login bem-sucedido, retorna o token JWT.'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: 'Credenciais inválidas ou campos ausentes.'
 */
router.post('/token', authController.generateToken);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca um usuário pelo seu ID.
 *     description: Retorna os dados públicos de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID numérico do usuário a ser buscado.
 *     responses:
 *       '200':
 *         description: 'Requisição bem-sucedida. Retorna os dados do usuário.'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstname:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *       '404':
 *         description: 'Usuário não encontrado.'
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /usuario:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário.
 *     description: Endpoint para registrar um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - surname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "João"
 *               surname:
 *                 type: string
 *                 example: "Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "senhaForte123"
 *               confirmPassword:
 *                 type: string
 *                 example: "senhaForte123"
 *     responses:
 *       '201':
 *         description: 'Usuário criado com sucesso.'
 *       '400':
 *         description: 'Dados inválidos (ex: senhas não conferem, email já em uso).'
 */
router.post('/', userController.create);

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     summary: Atualiza os dados de um usuário.
 *     description: 'Atualiza o nome, sobrenome e/ou email de um usuário existente. Requer autenticação.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "João"
 *               surname:
 *                 type: string
 *                 example: "Silva Santos"
 *               email:
 *                 type: string
 *                 example: "joao.santos@exemplo.com"
 *     responses:
 *       '204':
 *         description: 'Usuário atualizado com sucesso. Nenhuma resposta no corpo.'
 *       '400':
 *         description: 'Falha ao atualizar o usuário.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 *       '404':
 *         description: 'Usuário não encontrado.'
 */
router.put('/:id', authMiddleware, userController.update);

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     summary: Deleta um usuário.
 *     description: 'Remove um usuário do banco de dados. Requer autenticação.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do usuário a ser deletado.
 *     responses:
 *       '204':
 *         description: 'Usuário deletado com sucesso. Nenhuma resposta no corpo.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 *       '404':
 *         description: 'Usuário não encontrado.'
 */
router.delete('/:id', authMiddleware, userController.delete);

module.exports = router;