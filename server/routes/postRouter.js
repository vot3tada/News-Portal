const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')

router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.post('/', postController.add)
router.post('/:id', postController.likePost)
router.put('/:id', postController.edit)
router.delete('/:id', postController.delete)


module.exports = router