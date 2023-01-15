const express = require('express');
const { Product } = require('../database/models');
const ProductService = require('../services/products.service');
const ProductController = require('../controllers/products.controller');

const service = new ProductService(Product);
const router = express.Router();

router.get('/', (req, res, next) => new ProductController(service, req, res, next).findAll());

module.exports = router;