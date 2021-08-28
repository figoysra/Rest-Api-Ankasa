const { token } = require('../helper/env');

const midAuth = (req, res, next) => {
  const { headers } = req;
  if (headers.token === token) {
    next();
  } else {
    res.json('token salah');
  }
};

module.exports = midAuth;
