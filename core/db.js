const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    pool: {
        max: 10,
        min: 2,
        idle: 10000,
    },
})


module.exports.sequelize = sequelize