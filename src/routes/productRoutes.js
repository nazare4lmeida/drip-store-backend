const { Router } = require('express');
const productController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos.
 */

/**
 * @swagger
 * /produto/pesquisa:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: 'Realiza uma busca avançada por produtos.'
 *     description: 'Retorna uma lista paginada de produtos com base em múltiplos critérios de filtro.'
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
 *         description: 'Campos a serem retornados, separados por vírgula (ex: nome,slug,preco).'
 *       - in: query
 *         name: match
 *         schema:
 *           type: string
 *         description: 'Termo para buscar no nome e na descrição dos produtos.'
 *       - in: query
 *         name: category_ids
 *         schema:
 *           type: string
 *         description: 'IDs de categorias separadas por vírgula (ex: 15,24).'
 *       - in: query
 *         name: price-range
 *         schema:
 *           type: string
 *         description: 'Faixa de preço no formato min-max (ex: 100-200).'
 *       - in: query
 *         name: 'option[ID]'
 *         schema:
 *           type: string
 *         description: 'Filtro por opções do produto no formato option[ID_DA_OPCAO]=VALOR1,VALOR2.'
 *     responses:
 *       '200':
 *         description: 'Lista de produtos encontrada.'
 *       '400':
 *         description: 'Erro na busca de produtos.'
 */
router.get('/pesquisa', productController.search);

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: 'Busca um produto pelo seu ID.'
 *     description: 'Retorna todos os detalhes de um produto específico, incluindo suas associações (categorias, imagens, opções).'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'O ID do produto a ser buscado.'
 *     responses:
 *       '200':
 *         description: 'Sucesso. Retorna os dados do produto.'
 *       '404':
 *         description: 'Produto não encontrado.'
 *       '500':
 *          description: 'Falha ao buscar produto.'
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /produto:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Produtos
 *     summary: 'Cria um novo produto.'
 *     description: 'Cadastra um novo produto com todas as suas associações. Requer autenticação.'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: 'image/png'
 *                     content:
 *                       type: string
 *                       example: 'base64 da imagem...'
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                      title:
 *                          type: string
 *                      type:
 *                          type: string
 *                          enum: [texto, cor]
 *                      values:
 *                          type: array
 *                          items:
 *                              type: string
 *     responses:
 *       '201':
 *         description: 'Produto criado com sucesso.'
 *       '400':
 *         description: 'Dados inválidos.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 */
router.post('/', authMiddleware, productController.create);

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Produtos
 *     summary: 'Atualiza um produto existente.'
 *     description: 'Atualiza os dados de um produto e suas associações (imagens, opções). Requer autenticação.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'O ID do produto a ser atualizado.'
 *     requestBody:
 *       description: 'Corpo da requisição para atualização. Para deletar uma imagem ou opção, envie o objeto com o ID e a propriedade "deleted: true".'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     content:
 *                       type: string
 *                     deleted:
 *                       type: boolean
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     deleted:
 *                       type: boolean
 *     responses:
 *       '204':
 *         description: 'Produto atualizado com sucesso.'
 *       '400':
 *         description: 'Dados inválidos.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 *       '404':
 *         description: 'Produto não encontrado.'
 */
router.put('/:id', authMiddleware, productController.update);

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Produtos
 *     summary: 'Deleta um produto.'
 *     description: 'Remove um produto do banco de dados. Requer autenticação.'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 'O ID do produto a ser deletado.'
 *     responses:
 *       '204':
 *         description: 'Produto deletado com sucesso.'
 *       '401':
 *         description: 'Não autorizado. Token inválido ou não fornecido.'
 *       '404':
 *         description: 'Produto não encontrado.'
 */
router.delete('/:id', authMiddleware, productController.delete);

module.exports = router;