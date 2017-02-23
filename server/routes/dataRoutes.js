var express = require('express');
var router = express.Router();
var dataController = require('../controllers/dataController.js');

router.get('/search', dataController.searching);
router.get('/', dataController.list);
router.get('/:id', dataController.show);
router.post('/', dataController.create);
router.put('/:id', dataController.update);
router.delete('/:id', dataController.remove);

module.exports = router;
