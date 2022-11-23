var express = require('express');
var router = express.Router();
const clientesController = require('../controllers').clientesController;

router.get('/', clientesController.list);
router.get('/:id', clientesController.getById);
router.post('/', clientesController.add);
router.post('/login', clientesController.login);
router.put('/:id', clientesController.update);
router.delete('/:id', clientesController.delete);

module.exports = router;