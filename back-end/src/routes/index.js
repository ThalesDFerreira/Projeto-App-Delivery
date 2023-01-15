const express = require('express');
const { join } = require('path');

const router = express.Router();

const userRoutes = require('./user');

const productRoutes = require('./product');

const saleRoutes = require('./sale');

router.use('/user', userRoutes);

router.use('/products', productRoutes);

router.use('/sales', saleRoutes);

router.use('/images', express.static(join(__dirname, '..', 'images/')));

module.exports = router;