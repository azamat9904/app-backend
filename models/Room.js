const { DataTypes} = require('sequelize');
const { sequelize } = require('./index.js')


const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
}, {
   timestamps: true
});


module.exports.Room = Room