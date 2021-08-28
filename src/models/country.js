// untuk meghandle query table product

const db = require('../config/db');

const countryModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * from country', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select * from country  
                WHERE town LIKE "%${search}%" or country LIKE "%${search}%" 
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
    db.query(`select * from country where id_country='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO country (
      town,country
      ) VALUE (
        '${body.town}','${body.country}'
      )`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (body, id) => new Promise((resolve, reject) => {
    db.query(
      `update country set town='${body.town}',country='${body.country}'
        where id_country='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from country where id_country='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = countryModel;
