const express = require('express');
const { User } = require('../database/models');
const UserService = require('../services/user.service');
const UserController = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateTokenByUser');

const service = new UserService(User);
const router = express.Router();

router.get('/', (req, res, next) => new UserController(service, req, res, next).findAll());

router.post('/', (req, res, next) => 
new UserController(service, req, res, next).findByLoginCredentials());

router.get('/seller', (req, res, next) => 
new UserController(service, req, res, next).findByRole());

router.post('/register', (req, res, next) => 
new UserController(service, req, res, next).create());

router.post('/registerByAdm', validateToken, (req, res, next) => 
new UserController(service, req, res, next).create());

router.delete('/removeByAdm/:id', validateToken, (req, res, next) => 
new UserController(service, req, res, next).deleteById());

module.exports = router;