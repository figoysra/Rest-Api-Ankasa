const express = require('express');
const countryController = require('../controllers/country');
const authentication = require('../midleware/authentication');

const countryRouter = express.Router();
countryRouter
  .get('/country', countryController.getList)
  .get('/country/:id', countryController.getDetails)
  .post('/country', authentication, countryController.insert)
  .put('/country/:id', authentication, countryController.update)
  .delete('/country/:id', authentication, countryController.delete);

module.exports = countryRouter;
