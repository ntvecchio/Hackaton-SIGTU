const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

// Define as rotas
router.get('/', alunoController.listarAlunos);        // C-R-U-D: Read
router.post('/', alunoController.criarAluno);       // C-R-U-D: Create
router.patch('/:id', alunoController.atualizarAluno); // C-R-U-D: Update

// ===============================================
// NOVA ROTA: DELETAR UM (DELETE)
// ===============================================
router.delete('/:id', alunoController.deletarAluno); // C-R-U-D: Delete

module.exports = router;