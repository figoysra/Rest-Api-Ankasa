const express = require('express');
const transactionController = require('../controllers/transaction');
const authentication = require('../midleware/authentication');

const transactionRouter = express.Router();
transactionRouter
  .get('/transaction', authentication, transactionController.getList)
  .get('/transaction/:id', authentication, transactionController.getDetails)
  .post('/transaction', authentication, transactionController.insert)
  .put('/transaction/:id', authentication, transactionController.update)
  .delete('/transaction/:id', authentication, transactionController.delete);

module.exports = transactionRouter;
