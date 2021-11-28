/* eslint-disable linebreak-style */
require('dotenv').config();

const env = {
  dbUsername: process.env.db_username,
  dbPassword: process.env.db_password,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  token: process.env.token,
};
module.exports = env;
