const Router = require('express')
const router = new Router()


const userRouter = require('./userRouter')
const tagRouter = require('./tagRouter')
const postRouter = require('./postRouter')

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/tag', tagRouter)


module.exports = router