// bisa tergubung ke mysql2
const mysql = require('mysql2');
const { dbUsername, dbPassword } = require('../helper/env');

// untuk mengkoneksikan backend dengan mysql
const db = mysql.createConnection({
  host: 'localhost',
  user: dbUsername,
  password: dbPassword,
  database: 'ankasa',
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
