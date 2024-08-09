const config = require("../configs/mysql");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
    host: config.MYSQL_HOST,
    define: {timestamps: false},
    dialect: "mysql"
});

module.exports = sequelize;

