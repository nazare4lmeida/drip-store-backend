const { Router } = require('express');
const productController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/pesquisa', productController.search);
router.get('/:id', productController.getById);
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.delete);

module.exports = router;