const express = require('express');
const router = express.Router();
const ActividadesController = require('../controllers/ActividadesController');

router.get('/', ActividadesController.getAll);
router.get('/usuario/:usuarioId', ActividadesController.findByUser);
router.get('/categoria/:categoriaId', ActividadesController.findByCategoria);
router.get('/tareas/hoy/:usuarioId', ActividadesController.findToday);
router.get('/:id', ActividadesController.findOne);
router.post('/', ActividadesController.save);
router.put('/:id', ActividadesController.update);
router.delete('/:id', ActividadesController.delete);
router.put('/:id/toggle', ActividadesController.toggleTaskState);
router.get('/completadas/:usuarioId', ActividadesController.findCompletedByUser);


module.exports = router;
