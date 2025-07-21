const express = require('express');
const router = express.Router();
const ActividadesController = require('../controllers/ActividadesController');

router.get('/', ActividadesController.getAll);
router.get('/:id', ActividadesController.findOne);
router.post('/', ActividadesController.save);
router.put('/:id', ActividadesController.update);
router.delete('/:id', ActividadesController.delete);

module.exports = router;
