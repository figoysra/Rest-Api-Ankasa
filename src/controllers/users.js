const bcrypt = require('bcrypt');
const usersModel = require('../models/users');
const jwt = require("jsonwebtoken");
const { success, failed } = require('../helper/respon');
// const token = require('../config/token');
const {JWT_SECRET} = require('../helper/env')


const users = {
  register: (req, res) => {
    try {
      const { body } = req;
      usersModel
        .cekUsername(body)
        .then((result) => {
          console.log(result)
          if (result.length <= 0) {
            bcrypt.hash(body.password, 10, (err, hash) => {
              // Store hash in your password DB.
              if (err) {
                failed(res, 401, err);
              } else {
                usersModel.register(body, hash).then((result) => {
                  success(res, result);
                }).catch((err1) => {
                  failed(res, 401, err1);
                });
              }
            });
          } else {
            failed(res.status(401), 401, "username telah terdaftar");
          }
        })
        .catch((err) => {
          failed(res, 401, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  login: (req, res) => {
    try {
      const { body } = req;
      usersModel.cekUsername(body).then((result) => {
        if (result.length <= 0) {
          failed(res.status(401), 401, 'username / email salah');
        } else {
          const passwordHash = result[0].password;
          bcrypt.compare(body.password, passwordHash, (error, checkpassword) => {
            if (error) {
              res.json(error);
            } else if (checkpassword === true) {
              
              const user = result[0]
              const payload = {
                id: user.id_users,
                username: user.username
              }
              const token = jwt.sign(payload, JWT_SECRET);
              success(res, user, token);
            } else {
              failed(res, 401, 'Wrong Password');
            }
          });
        }
      }).catch((err) => {
        failed(res, 401, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },

  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id_users' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : query.limit;
      // eslint-disable-next-line eqeqeq
      const offset = query.page === undefined || query.page == 1 ? 0 : (query.page - 1) * limit;
      usersModel.getList(search, field, typeSort, limit, offset).then(async (result) => {
        // eslint-disable-next-line no-undef
        allData = await usersModel.getAll();
        const output = {
          users: result,
          // eslint-disable-next-line no-undef
          totalPage: Math.ceil(allData.length / limit),
          search,
          limit,
          page: query.page,
        };
        success(res, output, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getDetails: (req, res) => {
    try {
      const { id } = req.params;
      usersModel.getDetails(id).then((result) => {
        if(result.length <= 0 ){
          failed(res.status(401), 401, "user not found")
        }else{
          success(res, result[0], 'succes');
        }
        
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      usersModel.insert(body).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      bcrypt.hash(body.password, 10, (errb, hash) => {
        // Store hash in your password DB.
        if (errb) {
          failed(res, 401, errb);
        } else {
          usersModel.update(body, id, hash).then((result) => {
            success(res, result, 'succes');
          }).catch((err) => {
            failed(res, 500, err);
          });
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  delete: (req, res) => {
    try {
      const { id } = req.params;
      usersModel.delete(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = users;
