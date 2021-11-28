// bisa tergubung ke mysql2
const mysql = require('mysql2');
const { dbUsername, dbPassword, DB_HOST, DB_NAME } = require('../helper/env');

// untuk mengkoneksikan backend dengan mysql
const db = mysql.createConnection({
  host: DB_HOST,
  user: dbUsername,
  password: dbPassword,
  database: DB_NAME,
});

// unutk mengecek koneksi
db.connect((err) => {
  if (err) {
    console.log(`error connection${err}`);
  } else {
    console.log('connection succes');
  }
});

module.exports = db;
