var express = require('express');
var router = express.Router();
const carShopController = require('../controllers').carShopController;

router.get('/', carShopController.list);
router.get('/confirm/:id', carShopController.confirm);
router.post('/', carShopController.add);
router.delete('/:id', carShopController.delete);

module.exports = router;