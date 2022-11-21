var express = require('express');
var router = express.Router();
const ventasController = require('../controllers').ventasController;

router.get('/', ventasController.list);
//router.get('/:id', ventasController.getById);
router.put('/:id', ventasController.update);
router.delete('/:id', ventasController.delete);

module.exports = router;