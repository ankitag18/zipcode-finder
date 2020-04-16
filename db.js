const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Srw1VYzWu3', 'Srw1VYzWu3', 'fF8rqhE5vE', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

module.exports.db = { sequelize, DataTypes };