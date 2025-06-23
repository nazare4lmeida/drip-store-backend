const { Router } = require('express');
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.post('/token', authController.generateToken);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.delete);

module.exports = router;