const {Post, PostTag, Like, History, Tag} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')
const {where, Op} = require("sequelize");

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
            const post = await Post.create({title, content, userId: req.user.id})
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
            next(e)
        }
    }

    async getAll(req, res) {
        const {tagId} = req.query
        let posts = await Post.findAll({
            include: [{model: PostTag, where: {...(tagId ? {tagId: +tagId} : {})},}],
            order: [['id', 'DESC']]
            //through: {attributes: []},
            //attributes: []}]
        })
        console.log(posts)
        return res.json(posts)
    }

    async getSmartAll(req, res) {
        const interestingPosts = await Post.findAll({
            include: {model: History, where: {userId: req.user.id}},
            order: [['id', 'DESC']],
            limit: 50
        })
        const tags = await Tag.findAll({
            include: {
                model: Post,
                where: {id: {[Op.in]: interestingPosts.map(post => post.id)}}
            }
        });
        const posts = await Post.findAll({
            include: {
                model: Tag,
                where: {id: {[Op.in]: tags.map(tag => tag.id)}},
            },
            order: [['id', 'DESC']]
        })
        console.log(posts)
        return res.json(posts)
    }

    async likeorUnlikePost(req, res, next) {
        try {
            const {id} = req.params
            if (!id) throw ApiError.notFound()
            let like = await Like.findOne({userId: req.user.id, postId: id})
            if (like)
            {
                like.destroy();
                return res.json({statusLike: 'Deleted', like})
            }
            like = await Like.create({userId: req.user.id, postId: id})
            return res.json({statusLike: 'Added', like})
        } catch (e) {
            next(e)
        }
    }


    async getOne(req, res, next) {
        try {
            const {id} = req.params
            let post = await Post.findOne({where: {...(id ? {id: +id} : {})}})
            if (!post) throw ApiError.notFound()
            return res.json(post)
        } catch (e) {
            next(e)
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
            next(e)
        }
    }
}

module.exports = new PostController()