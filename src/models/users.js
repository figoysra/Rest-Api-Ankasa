// untuk meghandle query table product

const db = require('../config/db');

const usersModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * from users', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select * from users  
                WHERE username LIKE "%${search}%" 
                ORDER BY ${field} ${typeSort}
                LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from users where id_users='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (
      username,email,password,phone,address,
      photoProfile,creditCard,admin
      ) VALUE (
        '${body.username}','${body.email}','${body.password}','${body.phone}',
        '${body.address}','${body.photoProfile}','${body.creditCard}','${body.admin}'
      )`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  login: (body) => new Promise((resolve, reject) => {
    db.query(`
        select * from users where username=${body.username},password = ${body.password}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  register: (body, pass) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (username,email,password, photoProfile, admin) 
        VALUE (
          '${body.username}','${body.email}','${pass}','${body.photoProfile}','${body.admin}'
        )`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  cekUsername: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}' || email='${body.email}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  update: (body, id, hashpassword) => new Promise((resolve, reject) => {
    db.query(
      `update users set username='${body.username}',email='${body.email}',
          password='${hashpassword}',phone='${body.phone}',address='${body.address}',
          photoProfile='${body.photoProfile}',creditCard='${body.creditCard}',
          admin='${body.admin}' where id_users='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from users where id_users='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = usersModel;


