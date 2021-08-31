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
  getList: (search, field, typeSort, limit, offset, maxdeptime,
    mindeptime, maxarrivedTime, minarrivedTime, airlane,
    transit, wifi, meal, luggage, from,
    to, maxprice, minprice, date, cls) => new Promise((resolve, reject) => {
    db.query(
      `select id_ticket,logo,airlane,country.town as departure_city, 
      country.country as departure_country, d.town as destination_city, 
      d.country as destination_country, deptime,arrivedTime,price,class,transit,
      wifi,meal,luggage,codeAirplane
      from ticket left join country on ticket.from_id=country.id_country 
      left join country as d on ticket.destination_id=d.id_country
        WHERE (d.town LIKE "%${search}%" ||  d.country LIKE "%${search}%")
        || (country.town LIKE "%${from}%" || country.country LIKE "%${from}%")
        && ( d.town LIKE "%${to}%" || d.country LIKE "%${to}%" )
        && wifi LIKE "%${wifi}%" && meal LIKE "%${meal}%" && luggage LIKE "%${luggage}%" && class LIKE "%${cls}%"
        && transit LIKE "%${transit}%" && airlane LIKE "%${airlane}%"
        && date_format(deptime, '%Y-%m-%d') LIKE "%${date}%"
        && date_format(depTime, '%H:%i:%s') BETWEEN "${mindeptime}" AND "${maxdeptime}" 
        && date_format(arrivedTime, '%H:%i:%s') BETWEEN "${minarrivedTime}" AND "${maxarrivedTime}"
        && price BETWEEN "${minprice}" AND "${maxprice}"
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
        logo,airlane,from_id,destination_id,depTime,arrivedTime,
        price,class,transit,wifi,meal,luggage,codeAirplane
        ) VALUE (
        '${body.logo}','${body.airlane}','${body.from_id}','${body.destination_id}',
        '${body.depTime}','${body.arrivedTime}','${body.price}','${body.class}',
        '${body.transit}','${body.wifi}','${body.meal}','${body.luggage}',
        '${body.codeAirplane}'
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
      `update ticket set logo='${body.logo}',airlane='${body.airlane}',
      from_id='${body.from_id}',destination_id=${body.destination_id},
      depTime='${body.depTime}',arrivedTime='${body.arrivedTime}',price=${body.price},
      class='${body.class}',transit='${body.transit}',wifi=${body.wifi},meal=${body.meal},
      luggage=${body.luggage},codeAirplane='${body.codeAirplane}'
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
