const express = require('express');
const countryController = require('../controllers/country');
const midauth = require('../midleware/authentication');

const countryRouter = express.Router();
countryRouter
  .get('/country', midauth, countryController.getList)
  .get('/country/:id', midauth, countryController.getDetails)
  .post('/country', midauth, countryController.insert)
  .put('/country/:id', midauth, countryController.update)
  .delete('/country/:id', midauth, countryController.delete);

module.exports = countryRouter;