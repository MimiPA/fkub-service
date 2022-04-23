require("dotenv").config();

const {
  DB_HOSTNAME_TEST,
  DB_NAME_TEST,
  DB_USERNAME_TEST,
  DB_PASSWORD_TEST,
  DB_PORT_TEST,

  DB_HOSTNAME,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD, 
  DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_NAME_TEST,
    host: DB_HOSTNAME_TEST,
    dialect: "mysql",
    port: DB_PORT_TEST,
    
    dialectOptions: {
      connectTimeout: 120000,
    },
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: "postgres",
    port: DB_PORT,
    
    dialectOptions: {
      connectTimeout: 120000,
    },
  },
};