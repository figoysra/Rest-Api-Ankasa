const express = require('express');
const ticketController = require('../controllers/ticket');
const midauth = require('../midleware/authentication');

const ticketRouter = express.Router();
ticketRouter
  .get('/ticket', ticketController.getList)
  .get('/ticket/:id', ticketController.getDetails)
  .post('/ticket', midauth, ticketController.insert)
  .put('/ticket/:id', midauth, ticketController.update)
  .delete('/ticket/:id', midauth, ticketController.delete);

module.exports = ticketRouter;
