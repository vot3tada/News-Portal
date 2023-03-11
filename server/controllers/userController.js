const {User} = require('../models/models')
const ApiError = require('../error/ApiError')


class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async auth(req, res) {
        return res.json({message: 'ALL WORKING'})
    }
}

module.exports = new UserController()