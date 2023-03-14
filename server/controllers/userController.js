const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

const generateJwt = (id, login, role) => {
    return jwt.sign({id,login,role},
    'SecretKey12345',
    {expiresIn: '24h'})
}


class UserController {
    async registration(req, res, next) {
        const {name, login, password} = req.body
        if (!name || !login || !password) return next(ApiError.badRequest('Некорректный логин или пароль'))
        const candidate = await User.findOne({ where: {login}})
        if (candidate) return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        const hashPassword = await bcrypt.hash(password, 7)
        const user = await User.create({name, login,password: hashPassword})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }


    async login(req, res) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) return next(ApiError.internal('Пользователь не найден'))
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) return next(ApiError.internal('Неправильный пароль'))
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token}) 
    }

    async auth(req, res) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()