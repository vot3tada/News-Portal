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
        const {tagId} = req.query
        let posts = await Post.findAll({where: {...(tagId ? tagId : {})}})
        return res.json(posts)
    }


    async getOne(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new PostController()