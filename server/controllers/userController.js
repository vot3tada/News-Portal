const {User, History} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {where} = require('sequelize')

const generateJwt = (id, login, role) => {
    return jwt.sign({id, login, role},
        'SecretKey12345',
        {expiresIn: '24h'})
}


class UserController {
    async registration(req, res, next) {
        try
        {
            const {name, login, password} = req.body
            if (!name || !login || !password) throw ApiError.badRequest('Некорректный логин или пароль')
            const candidate = await User.findOne({where: {login}})
            if (candidate) throw ApiError.badRequest('Пользователь с таким логином уже существует')
            const hashPassword = await bcrypt.hash(password, 7)
            const user = await User.create({name, login, password: hashPassword})
            const token = generateJwt(user.id, user.login, user.role)
            return res.json({token})
        }   
        catch(e)
        {
            next(e)
        }
    }


    async login(req, res, next) {
        try
        {
            const {login, password} = req.body
            const user = await User.findOne({where: {login}})
            if (!user) throw ApiError.internal('Пользователь не найден')
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) throw ApiError.internal('Неправильный пароль')
            const token = generateJwt(user.id, user.login, user.role)
            return res.json({token})
        }
        catch(e)
        {
            next(e)
        }
        
    }

    async auth(req, res) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

    async roleChanger(req, res, next) {
        try
        {
            const {login, role} = req.body
            const user = await User.findOne({where: {login}})
            if (!user) throw ApiError.internal('Пользователь не найден')
            user.role = role
            user.save()
            return res.json({user})
        }
        catch(e)
        {
            next(e)
        }
    }

    async saveHistory(req, res, next) {
        const {id} = req.params
        await History.create({userId: req.user.id, postId: id})
        next()
    }
}

module.exports = new UserController()