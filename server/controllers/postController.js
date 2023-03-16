const {Post, PostTag,Like} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')

class PostController {
    async add(req, res, next) {
        try {
            const {title, content} = req.body
            if (req.files) {
                const {image} = req.files
                let filename = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', filename))
                const post = await Post.create({title, content, image: filename})
                return res.json(post)
            }
            const post = await Post.create({title, content})
            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res, next) {
        try {
            const {id} = req.params
            const {title, content} = req.body
            let post = await Post.findOne({where: {...(id ? {id: +id} : {})}})
            post.title = title
            post.content = content
            if (req.files) {
                const {image} = req.files
                if (post.image) fs.unlink(path.resolve(__dirname, '..', 'static', post.image), (err) => {
                    if (err) throw err
                })
                let filename = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', filename))
                post.image = filename
                await post.save()
                return res.json(post)
            }
            await post.save()
            return res.json(post)
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }

    async getAll(req, res) {
        const {tagId} = req.query
        let posts = await Post.findAll({
            include: [{model: PostTag, where: {...(tagId ? {tagId: +tagId} : {})},}]
            //through: {attributes: []},
            //attributes: []}]
        })
        return res.json(posts)
    }

    async likePost(req, res, next) {
        try {
            const {id} = req.params
            if (!id) throw ApiError.notFound()
            await Like.create({ userId: req.user.id, postId: id})
            return res.json({Like})
        }
        catch (e)
        {
            next(ApiError.notFound(e))
        }
    }


    async getOne(req, res, next) {
        try {
            const {id} = req.params
            let post = await Post.findOne({where: {...(id ? {id: +id} : {})}})
            if (!post) throw ApiError.notFound()
            return res.json(post)
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            let post = await Post.findOne({where: {...(id ? {id: +id} : {})}})
            if (post.image) fs.unlink(path.resolve(__dirname, '..', 'static', post.image), (err) => {
                if (err) throw err
            })
            await post.destroy()
            return res.json({})
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }
}

module.exports = new PostController()