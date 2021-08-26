const midAuth = (req, res, next) => {
  const token = '1234';
  const { headers } = req;
  if (headers.token === token) {
    next();
  } else {
    res.json('token salah');
  }
};

module.exports = midAuth;
