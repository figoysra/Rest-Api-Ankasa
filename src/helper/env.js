require('dotenv').config();

const env = {
  dbUsername: process.env.db_username,
  dbPassword: process.env.db_password,
};
module.exports = env;
