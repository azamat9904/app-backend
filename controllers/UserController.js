const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {config } = require('../config')
const { Users} = require("../models/Users");

const register = async (req, res) => {
    try {
        const { name = '', surname = '', login, password } = req.body

        console.log(name, surname, login, password)
        if (!(login && password)) {
            return res.status(400).json({
                message:
                    'Запрос завершился ошибкой, логин и пароль обязательные поля',
                status: 'error',
                result: null,
            })
        }

        const oldUser = await Users.findOne({ where: { login } })

        if (oldUser) {
            return res.status(409).json({
                message:
                    'Такой пользователь уже существует',
                status: 'error',
                result: null,
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await Users.create({
            name,
            surname,
            login: login.toLowerCase(),
            password: encryptedPassword,
        })

        const token = jwt.sign(
            { id: user.id, login, name, surname },
            config.JWT_SECRET
        )

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                token: token,
            },
        })
    } catch (e) {
        res.status(500).json({
            message: 'Запрос завершился неудачно:' + e.message,
            status: 'error',
            result: null,
        })
        console.error(e.message)
    }
}

const login = async (req, res) => {
    try {
        const { login, password } = req.body

        if (!(login && password)) {
            return res.status(400).json({
                message:
                    'Логин и пароль обязательные поля',
                status: 'error',
                result: null,
            })
        }

        const user = await Users.findOne({ where: { login: login } })
        const isPasswordEqual = await bcrypt.compare(password, user.password)

        if (user && isPasswordEqual) {
            const token = jwt.sign(
                { id: user.id, login, name: user.name, surname: user.surname },
                config.JWT_SECRET
            )

            return res.status(200).json({
                message: 'Запрос успешно отработал',
                status: 'success',
                result: {
                    token: token,
                },
            })
        }

        res.status(400).json({
            message: 'Запрос завершился ошибкой, неверные данные',
            status: 'error',
            result: null,
        })
    } catch (e) {
        res.status(500).json({
            message:
                'Запрос завершился неудачно:' + e.message,
            status: 'error',
            result: null,
        })
        console.log(e.message)
    }
}

module.exports.register = register
module.exports.login = login