const { DataTypes} = require('sequelize');
const { sequelize } = require('../core/db')
const  { Room } = require('./Room')

const NoBusinessDay = sequelize.define('NoBussinessDay', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomId: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true
});

Room.hasMany(NoBusinessDay, {
    foreignKey: {
        name: 'roomId',
    },
})

NoBusinessDay.belongsTo(Room, {
    foreignKey: {
        name: 'roomId',
    },
})


module.exports.NoBusinessDay = NoBusinessDay