// untuk menghandle router users

const express = require('express');
const usersController = require('../controllers/users');
const authentication = require('../midleware/authentication');
const authorization = require('../midleware/authorization')

const usersRouter = express.Router();
usersRouter
  .get('/users', authentication,authorization, usersController.getList)
  .post('/login', usersController.login)
  .get('/users/:id', authentication, usersController.getDetails)
  .post('/users', authentication,authorization, usersController.insert)
  .post('/register', usersController.register)
  .put('/users/:id', authentication, usersController.update)
  .delete('/users/:id', authentication,authorization, usersController.delete);

module.exports = usersRouter;
