const config = require('config');
require('dotenv').config();

module.exports = {
    SERVER: {
        PORT: config.get('port'),
        PROTOCOL: config.get('protocol'),
        HOST: config.get('host')
    },
    DB: {
        MONGOOSE: {
            URI: process.env.DB_URI
        }
    },
    VALIDATE: {
        MIN_LENGTH_PASSWORD: 6
    },
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_RESET_SECRET: process.env.JWT_REFRESH_SECRET,
    NODEMAILER: {
        EMAIL: process.env.EMAIL_LOGIN,
        PASSWORD: process.env.EMAIL_PASSWORD
    },
    LIVE_TIME_TOKEN: 5 * 60000,
    STORAGE_FILES: '../img'
}
