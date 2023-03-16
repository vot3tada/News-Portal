const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')
const isCreator = require('../middleware/isCreatorMiddleware')
const isAdmin = require('../middleware/isAdminMiddleware')

router.get('/', authMiddleware, postController.getAll)
router.get('/:id', authMiddleware, postController.getOne)
router.post('/', authMiddleware, postController.add)
router.post('/:id', authMiddleware, postController.likePost)
router.put('/:id', authMiddleware, postController.edit)
router.delete('/:id', authMiddleware, postController.delete)


module.exports = router