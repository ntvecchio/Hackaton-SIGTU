const express = require('express');
const router = express.Router();

const onibusController = require('../controllers/onibusController');

// ===============================================
// IMPORTA O NOSSO "PORTEIRO" (MIDDLEWARE)
// ===============================================
const checkAuth = require('../middlewares/authMiddlaware');

// Rotas C-R-U-D para /onibus

// GET (Listar) - Rota PÚBLICA, não precisa de "checkAuth"
router.get('/', onibusController.listarOnibus);

// POST (Criar) - Rota PROTEGIDA, precisa de "checkAuth"
// O checkAuth roda ANTES do controller
router.post('/', checkAuth, onibusController.criarOnibus);

// PATCH (Atualizar) - Rota PROTEGIDA
router.patch('/:id', checkAuth, onibusController.atualizarOnibus);

// DELETE (Deletar) - Rota PROTEGIDA
router.delete('/:id', checkAuth, onibusController.deletarOnibus);

// Rota de Matrícula - Rota PROTEGIDA
router.post('/:idOnibus/matricular/:idAluno', checkAuth, onibusController.matricularAluno);

module.exports = router;