const express = require('express');
const router = express.Router();
const embarqueController = require('../controllers/embarqueController');

// Rota principal de embarque
// Nota: Em um sistema real, o "leitor" (totem/app) também teria
// um token de segurança, mas para este teste, vamos deixar "público".
router.post('/', embarqueController.verificar);

module.exports = router;