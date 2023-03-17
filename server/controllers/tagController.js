const {Tag, PostTag, Post} = require('../models/models')
const ApiError = require('../error/ApiError')

class TagController {
    async add(req, res) {
        const {name} = req.body
        const tag = await Tag.create({name})
        return res.json(tag)
    }

    async getAll(req, res) {
        const tags = await Tag.findAll()
        return res.json(tags)
    }

    async linkPostToTag(req, res, next) {
        try {
            const {tagId,postId} = req.query
            if (!tagId || !postId) throw ApiError.notFound()
            const linked = await PostTag.create({tagId, postId})
            return res.json(linked)
        }
        catch (e)
        {
            next(e)
        }

    }
}

module.exports = new TagController()