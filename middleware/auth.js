const jwt = require('jsonwebtoken')
const {config } = require('../config')

const verifyToken = (
    req,
    res,
    next
) => {
    const authorization = req.headers['authorization']

    if (!authorization) {
        return res.status(401).json({
            message: 'Токен отсутствует',
            status: 'error',
            result: null,
        })
    }

    const token = authorization.split(' ')?.[1]

    if (!token) {
        return res.status(401).json({
            message: 'Токен отсутствует',
            status: 'error',
            result: null,
        })
    }

    try {
        req.user = jwt.verify(token, config.JWT_SECRET)
    } catch (err) {
        return res.status(403).json({
            message: 'Невалидный токен',
            status: 'error',
            result: null,
        })
    }
    return next()
}

module.exports.verifyToken = verifyToken