const express = require('express');

const cors = require('cors');
const ErrorHandler = require('../middlewares/ErrorHandler');
const routes = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(routes);

app.use(ErrorHandler);

module.exports = app;
