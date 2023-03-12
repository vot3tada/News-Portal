const {Post} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')

class PostController {
    async add(req, res, next) {
        try {
            const {title, content} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            const post = await Post.add({title, content, image: filename})

            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res) {

    }

    async getAll(req, res) {
        const {tagId, id} = req.query
        let posts = await Post.findAll({where: {...(tagId ? {tagId: +tagId} : {})}})
        return res.json(posts)
    }


    async getOne(req, res, next) {
        try{
            const {id} = req.params
            let post = await Post.findOne({where: {...(id ? {id: +id} : {})}})
            if (!post) throw ApiError.notFound()
            return res.json(post)
        }
        catch (e)
        {
            next(ApiError.notFound(e.message))
        }
    }

    async delete(req, res) {

    }
}

module.exports = new PostController()