/* eslint-disable linebreak-style */
const express = require('express');
const ticketController = require('../controllers/ticket');
const authentication = require('../midleware/authentication');
const authorization = require('../midleware/authorization')

const ticketRouter = express.Router();
ticketRouter
  .get('/ticket', ticketController.getList)
  .get('/ticket/:id', ticketController.getDetails)
  .post('/ticket', authentication,authorization, ticketController.insert)
  .put('/ticket/:id', authentication,authorization, ticketController.update)
  .delete('/ticket/:id', authentication,authorization, ticketController.delete);

module.exports = ticketRouter;
