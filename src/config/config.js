require("dotenv").config();

const {
    DB_HOSTNAME_MYSQL,
    DB_NAME_MYSQL,
    DB_USERNAME_MYSQL,
    DB_PASSWORD_MYSQL,
    DB_PORT_MYSQL,

    DB_HOSTNAME_POSTGRES,
    DB_NAME_POSTGRES,
    DB_USERNAME_POSTGRES,
    DB_PASSWORD_POSTGRES,
    DB_PORT_POSTGRES,
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME_MYSQL,
        password: DB_PASSWORD_MYSQL,
        database: DB_NAME_MYSQL,
        host: DB_HOSTNAME_MYSQL,
        dialect: "mysql",
        port: DB_PORT_MYSQL,

        dialectOptions: {
            connectTimeout: 120000,
        },
    },
    test: {
        username: DB_USERNAME_POSTGRES,
        password: DB_PASSWORD_POSTGRES,
        database: DB_NAME_POSTGRES,
        host: DB_HOSTNAME_POSTGRES,
        dialect: "postgres",
        port: DB_PORT_POSTGRES,

        dialectOptions: {
            connectTimeout: 120000,
        },
    },
};