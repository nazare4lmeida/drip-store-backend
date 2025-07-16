const { Router } = require('express');
const categoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: API para gerenciamento de categorias de produtos.
 */

/**
 * @swagger
 * /categoria/pesquisa:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: 'Busca por categorias.'
 *     description: 'Retorna uma lista paginada de categorias, com opções de filtro.'
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: 'Número de itens por página. Use -1 para retornar todos.'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 'O número da página a ser retornada.'
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: 'Campos a serem retornados, separados por vírgula (ex: nome,slug).'
 *       - in: query
 *         name: use_in_menu
 *         schema:
 *           type: boolean
 *         description: 'Filtrar por categorias que devem ser exibidas no menu.'
 *     responses:
 *       '200':
 *         description: 'Lista de categorias encontrada.'
 *       '400':
 *         description: 'Falha na busca.'
 */
router.get('/pesquisa', categoryController.search);

/**
 * @swagger
 * /categoria/{id}:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: 'Busca uma categoria pelo seu ID.'
 *     description: 'Retorna os detalhes de uma categoria específica.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'O ID da categoria a ser buscada.'
 *     responses:
 *       '200':
 *         description: 'Sucesso. Retorna os dados da categoria.'
 *       '404':
 *         description: 'Categoria não encontrada.'
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /categoria:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categorias
 *     summary: 'Cria uma nova categoria.'
 *     description: 'Cadastra uma nova categoria no sistema. Requer autenticação.'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: 'Calçados'
 *               slug:
 *                 type: string
 *                 example: 'calcados'
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '201':
 *         description: 'Categoria criada com sucesso.'
 *       '400':
 *         description: 'Dados inválidos (ex: slug duplicado).'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 */
router.post('/', authMiddleware, categoryController.create);

/**
 * @swagger
 * /categoria/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categorias
 *     summary: 'Atualiza uma categoria existente.'
 *     description: 'Atualiza os dados de uma categoria. Requer autenticação.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'O ID da categoria a ser atualizada.'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: 'Calçados e Acessórios'
 *               slug:
 *                 type: string
 *                 example: 'calcados-e-acessorios'
 *               use_in_menu:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '204':
 *         description: 'Categoria atualizada com sucesso.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 *       '404':
 *         description: 'Categoria não encontrada.'
 */
router.put('/:id', authMiddleware, categoryController.update);

/**
 * @swagger
 * /categoria/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categorias
 *     summary: 'Deleta uma categoria.'
 *     description: 'Remove uma categoria do banco de dados. Requer autenticação.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'O ID da categoria a ser deletada.'
 *     responses:
 *       '204':
 *         description: 'Categoria deletada com sucesso.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 *       '404':
 *         description: 'Categoria não encontrada.'
 */
router.delete('/:id', authMiddleware, categoryController.delete);

module.exports = router;