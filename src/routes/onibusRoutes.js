const express = require('express');
const router = express.Router();

// Importa o NOVO controller de ônibus
const onibusController = require('../controllers/onibusController');

// Rotas C-R-U-D para /onibus
router.get('/', onibusController.listarOnibus);
router.post('/', onibusController.criarOnibus);
router.patch('/:id', onibusController.atualizarOnibus);
router.delete('/:id', onibusController.deletarOnibus);

module.exports = router;