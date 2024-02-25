const express = require('express');
const shopRoutes = require('./shopRoutes');
const productRoutes = require('./productRoutes');


const router = express.Router();

router.use('/shop', shopRoutes);
router.use('/product', productRoutes);


module.exports = router;
