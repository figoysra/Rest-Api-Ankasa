// untuk meghandle query table product

const db = require('../config/db');

const ticketModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * from ticket', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: () => new Promise((resolve, reject) => {
    db.query(
      `select id_ticket,logo,airlane,country.town,country.country, u2.town, u2.country, 
      deptime,arrivedTime,price,class,transit,wifi,meal,bagasi
      from ticket inner join country on ticket.from_id=country.id_country 
      left join country u2 on ticket.destination_id=u2.id_country`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from ticket where id_ticket='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO ticket (
      town,ticket
      ) VALUE (
        '${body.town}','${body.ticket}'
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
      `update ticket set town='${body.town}',ticket='${body.ticket}'
        where id_ticket='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from ticket where id_ticket='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = ticketModel;
