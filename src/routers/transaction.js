const express = require('express');
const transactionController = require('../controllers/transaction');
const midauth = require('../midleware/authentication');

const transactionRouter = express.Router();
transactionRouter
  .get('/transaction', midauth, transactionController.getList)
  .get('/transaction/:id', midauth, transactionController.getDetails)
  .post('/transaction', midauth, transactionController.insert)
  .put('/transaction/:id', midauth, transactionController.update)
  .delete('/transaction/:id', midauth, transactionController.delete);

module.exports = transactionRouter;
