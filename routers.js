const express = require('express');
const router = express.Router();
const ItemController = require('./controllers/ItemController');

router.get('/todo', ItemController.getAllItems);
router.post('/todo', ItemController.createItem);
router.put('/todo/:id', ItemController.updateItem);
router.delete('/todo/:id', ItemController.deleteItem);

module.exports = router;