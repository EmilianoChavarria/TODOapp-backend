const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriasController');

// Rutas 
router.get('/', CategoriaController.getAll);
router.post('/save', CategoriaController.save);
router.put('/:id', CategoriaController.update);

module.exports = router;
