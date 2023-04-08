const jwt = require('jsonwebtoken')
const {User} = require("../models/models");
const {generateJwt} = require('../staticFunctions/generateJwt')

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") next()
    try
    {
        let token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({message: 'Не авторизован'})
        let payload = jwt.verify(token, process.env.SECRET_KEY)
        req.user = payload
        let user = await User.findOne({where: {login: req.user.login}})
        token = generateJwt(user.id, user.login, user.role)
        payload = jwt.verify(token, process.env.SECRET_KEY)
        req.user = payload
        next()
    }
    catch(e)
    {
        return res.status(401).json({message: 'Не авторизован'})
    }
}