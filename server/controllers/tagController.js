const {Tag, PostTag, Post} = require('../models/models')
const ApiError = require('../error/ApiError')

class TagController {
    async add(req, res) {
        const {name} = req.body
        const tag = await Tag.create({name})
        return res.json(tag)
    }
    async delete(req, res) {
        const {id} = req.params
        const tag = await Tag.findOne({where:{id: id}})
        tag.destroy();
        return res.json({status: 'deleted'})
    }

    async getAll(req, res) {
        const tags = await Tag.findAll()
        return res.json(tags)
    }

    async linkPostToTag(req, res, next) {
        try {
            const {tagId,postId} = req.body
            if (!tagId || !postId) throw ApiError.notFound()
            const linked = await PostTag.create({tagId, postId})
            return res.json(linked)
        }
        catch (e)
        {
            next(e)
        }
    }
    async unlinkPostToTag(req, res, next) {
        try {
            const {tagId, postId} = req.body
            if (!tagId || !postId) throw ApiError.notFound()
            const linked = await PostTag.findOne({where: {tagId: tagId, postId: postId}})
            linked.destroy()
            return res.json({status: 'unlinked'})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TagController()