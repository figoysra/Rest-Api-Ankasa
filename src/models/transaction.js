// untuk meghandle query table product

const db = require('../config/db');

const transactionModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * from transaction', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select id_transaction,phone,gender,name,country,insurance,id_ticket,from_id.country,destination_id,
      class,price,transit,total
      from transaction left join users on transaction.contactPerson=users.id_users  
      left join country on transaction.country_id=country.id_country  
      left join country on transaction.from_id=country.id_country  
      left join ticket on transaction.ticket_id=ticket.id_ticket
                WHERE name LIKE "%${search}%"
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
    db.query(`select * from transaction where id_transaction='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO transaction (
      contactPerson,gender,name,country_id,insurance,ticket_id,total,payment
      ) VALUE (
        '${body.contactPerson}','${body.gender}'
        '${body.name}','${body.country_id}'
        '${body.insurance}','${body.ticket_id}'
        '${body.total}','${body.payment}'
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
      `update transaction set contactPerson='${body.contactPerson}',
         gender='${body.gender}',name='${body.name}',country_id='${body.country_id}',
         insurance='${body.insurance}',ticket_id='${body.ticket_id}',total='${body.total}',
         payment='${body.payment}'
        where id_transaction='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from transaction where id_transaction='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = transactionModel;
