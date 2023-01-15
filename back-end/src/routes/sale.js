const express = require('express');
const { Sale } = require('../database/models');
const SaleService = require('../services/sales.service');
const SaleController = require('../controllers/sales.controller');

const validateSale = require('../middlewares/validateSale');

const validateToken = require('../middlewares/validateToken');

const service = new SaleService(Sale);
const router = express.Router();

router.get('/byuser', validateToken, (req, res, next) => 
new SaleController(service, req, res, next).findByUserId());

router.get('/byseller', validateToken, (req, res, next) => 
new SaleController(service, req, res, next).findBySellerId());

router.get('/bysaleId/:id', (req, res, next) => 
new SaleController(service, req, res, next).findById());

router.patch('/:id', validateToken, (req, res, next) => 
new SaleController(service, req, res, next).updateStatusById());

// router.get('/seller', (req, res, next) => 
// new SaleController(service, req, res, next).findByRole());

router.post('/', validateToken, validateSale, (req, res, next) => 
new SaleController(service, req, res, next).create());

module.exports = router;