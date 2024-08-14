var express = require('express');
const authController = require('../controllers/userController');
const router = express.Router();

// Route đăng ký
router.post('/register', authController.register);

// Route đăng nhập
router.post('/login', authController.login);

// Route logout
router.post('/logout', authController.logout);

module.exports = router;
