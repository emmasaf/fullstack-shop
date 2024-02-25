const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:shopId', productController.getProduct);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
