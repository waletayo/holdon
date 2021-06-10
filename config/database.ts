const DbSequelize = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

module.exports = new DbSequelize('LocationDb','postgres','', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
