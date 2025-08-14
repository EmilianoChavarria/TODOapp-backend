const express = require('express');
const router = express.Router();
const SubtareasController = require('../controllers/SubtareasController');

router.get('/', SubtareasController.getAll);
router.get('/:id', SubtareasController.findOne);

router.get('/activity/:tarea_id', SubtareasController.getByActivity);

router.post('/', SubtareasController.save);
router.put('/:id', SubtareasController.update);
router.put('/:id/toggle', SubtareasController.toggle);

router.delete('/:id', SubtareasController.delete);

module.exports = router;

