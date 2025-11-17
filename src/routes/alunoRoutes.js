const express = require('express');
const router = express.Router();

// Importa o controlador que acabamos de criar
const alunoController = require('../controllers/alunoController');

// Define as rotas:
// Quando alguém acessar GET /alunos -> Chama a função listarAlunos
router.get('/', alunoController.listarAlunos);

// Quando alguém acessar POST /alunos -> Chama a função criarAluno
router.post('/', alunoController.criarAluno);

module.exports = router;