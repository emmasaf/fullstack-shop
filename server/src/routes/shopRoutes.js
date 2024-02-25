const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/', shopController.getShopItems);
router.post('/', shopController.addShopItem);
router.delete('/:id', shopController.deleteShopItem);

module.exports = router;
