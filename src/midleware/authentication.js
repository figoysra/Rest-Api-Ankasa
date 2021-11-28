/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../helper/env');
const { failed } = require('../helper/respon');

const authentication = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      failed(res.status(401), 401, err);
    } else {
      req.userId = decoded.id;
      // console.log(decoded)
      next();
    }
  });
  // console.log(token)
};
module.exports = authentication;
