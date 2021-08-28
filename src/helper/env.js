require('dotenv').config();

const env = {
  dbUsername: process.env.db_username,
  dbPassword: process.env.db_password,
  token: process.env.token,
};
module.exports = env;
