const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// 1. IMPORTA O NOSSO "PORTEIRO" (MIDDLEWARE)
const checkAuth = require('../middlewares/authMiddlaware');

// 2. APLICA O PORTEIRO NAS ROTAS

// GET (Listar) - Rota PÚBLICA, todos podem ver
router.get('/', alunoController.listarAlunos);

// POST (Criar) - Rota PROTEGIDA
router.post('/', checkAuth, alunoController.criarAluno);

// PATCH (Atualizar) - Rota PROTEGIDA
router.patch('/:id', checkAuth, alunoController.atualizarAluno);

// DELETE (Deletar) - Rota PROTEGIDA
router.delete('/:id', checkAuth, alunoController.deletarAluno);

module.exports = router;