const { DataTypes} = require('sequelize');
const { sequelize } = require('../core/db')
const { Room } = require('./Room');

const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomId: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    middlename: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.STRING
    },
    endDate: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});


Room.hasMany(Schedule, {
    foreignKey: {
        name: 'roomId',
    },
})

Schedule.belongsTo(Room, {
    foreignKey: {
        name: 'roomId',
    },
})


module.exports.Schedule = Schedule