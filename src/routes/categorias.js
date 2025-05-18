const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriasController');

// Rutas 
router.get('/', CategoriaController.getAll);

module.exports = router;
