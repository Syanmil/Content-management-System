var express = require('express');
var router = express.Router();
var dataDateController = require('../controllers/dataDateController.js');

router.get('/', dataDateController.list);
router.get('/:id', dataDateController.show);
router.post('/', dataDateController.create);
router.put('/:id', dataDateController.update);
router.delete('/:id', dataDateController.remove);

module.exports = router;
