const {Tag} = require('../models/models')
const ApiError = require('../error/ApiError')

class TagController {
    async add(req, res) {
        const {name} = req.body
        const tag = await Tag.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const tags = await Tag.findAll()
        return res.json(tags)
    }
}

module.exports = new TagController()