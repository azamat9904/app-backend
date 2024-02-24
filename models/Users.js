const { DataTypes} = require('sequelize');
const { sequelize } = require('../core/db')

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
})


module.exports.Users = Users
