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
        constraints: false
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
    },
    comment: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
});


Room.hasMany(Schedule, {
    foreignKey: {
        name: 'roomId',
    },
    constraints: false
})

Schedule.belongsTo(Room, {
    foreignKey: {
        name: 'roomId',
    },
    constraints: false
})


module.exports.Schedule = Schedule