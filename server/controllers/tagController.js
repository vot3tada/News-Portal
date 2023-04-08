const {Tag, PostTag, Post} = require('../models/models')
const ApiError = require('../error/ApiError')

class TagController {
    async add(req, res, next) {
        try {
            const {name} = req.body
            const tag = await Tag.create({name})
            return res.json(tag)
        } catch (e) {
            next(e)
        }

    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const tag = await Tag.findOne({where: {id: id}})
            tag.destroy();
            return res.json({status: 'deleted'})
        } catch (e) {
            next(e)
        }

    }

    async getAll(req, res, next) {
        try {
            const tags = await Tag.findAll()
            return res.json(tags)
        } catch (e) {
            next(e)
        }
    }

    async linkPostToTag(req, res, next) {
        try {
            const {tagId, postId} = req.body
            if (!tagId || !postId) throw ApiError.notFound()
            const linked = await PostTag.create({tagId, postId})
            return res.json(linked)
        } catch (e) {
            next(e)
        }
    }

    async unlinkPostToTag(req, res, next) {
        try {
            const {tagId, postId} = req.body
            if (!tagId || !postId) throw ApiError.notFound()
            const linked = await PostTag.findAll({where: {postId: postId}})
            linked.map(async link => (await link.destroy()))
            return res.json({status: 'unlinked'})
        } catch (e) {
            next(e)
        }
    }
    async changeLink(req, res, next) {
        try {
            const {tagId, postId} = req.body
            if (!tagId || !postId) throw ApiError.notFound()
            const linked = await PostTag.findAll({where: {postId: postId}})
            linked.map(async link => (await link.destroy()))
            const newLink = await PostTag.create({tagId, postId})
            return res.json(newLink)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TagController()