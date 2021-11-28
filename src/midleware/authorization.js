const { failed } = require('../helper/respon');
const usersmodel = require('../models/users');

const authorization = (req, res, next) => {
  const id = req.userId;
  usersmodel
    .getDetails(id)
    .then((result) => {
      // console.log(result)
      if (result[0].admin === 0) {
        next();
      } else {
        failed(res.status(401), 401, 'You Do Not Have Permission To Access');
      }
    })
    .catch((err) => {
      failed(res.status(404), 404, err);
    });
};
module.exports = authorization;
