const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// Rutas 
router.get('/', UsuarioController.getAll);
router.get('/:id', UsuarioController.findOne);
router.post('/save', UsuarioController.save);

module.exports = router;
