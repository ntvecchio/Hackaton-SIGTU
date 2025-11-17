const express = require('express');
const router = express.Router();

// Importa o NOVO controller de autenticação
const authController = require('../controllers/authController');

// Rota para REGISTRAR um novo admin
router.post('/register', authController.register);

// Rota para LOGAR (entrar)
router.post('/login', authController.login);

module.exports = router;