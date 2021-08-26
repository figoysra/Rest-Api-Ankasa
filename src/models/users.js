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
    db.query(`select * from users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (name,email,password,username,picture,phone_number,address,birth_date,gender) 
                VALUE ('${body.email}','${body.password}','${body.username}','${body.name}',
                    '${body.picturee}','${body.phone_number}','${body.address}','${body.birth_date}',
                    '${body.gender}')`, (err, result) => {
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
      `INSERT INTO users (name,email,password) 
        VALUE (
          '${body.name}','${body.email}','${pass}'
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
    db.query(`select * from users where username='${body.username}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (body, id) => new Promise((resolve, reject) => {
    db.query(
      `update USERS set name='${body.name}',email='${body.email}',password='${body.password}',
                username='${body.username}',picture='${body.piture}',phone_number='${body.phone_number}',
                address='${body.address}',birth_date='${body.birth_date}',gender='${body.gender}'
                where id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = usersModel;
