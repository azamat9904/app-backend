const { Sequelize } = require('sequelize')
const {config } = require('../config/index')
const sequelize = new Sequelize(`mysql://${config.DB_USERNAME}:${config.DB_PASSWORD}@monorail.proxy.rlwy.net:${config.DB_PORT}/railway`)

//test

module.exports.sequelize = sequelize