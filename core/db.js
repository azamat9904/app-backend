const { Sequelize } = require('sequelize')
const {config } = require('../config/index')

const sequelize = new Sequelize(`${config.DB_MYSQL_URL}`)

//test

module.exports.sequelize = sequelize


