const { DataTypes} = require('sequelize');
const { sequelize } = require('../core/db')

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    }
}, {
   timestamps: true
});

module.exports.Room = Room