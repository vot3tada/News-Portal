const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const isCreator = require('../middleware/isCreatorMiddleware')
const isAdmin = require('../middleware/isAdminMiddleware')

router.get('/', authMiddleware, postController.getAll)
router.get('/:id', authMiddleware,userController.saveHistory, postController.getOne)
router.post('/', authMiddleware, isCreator, postController.add)
router.post('/:id', authMiddleware, postController.likeorUnlikePost)
router.put('/:id', authMiddleware, isCreator, postController.edit)
router.delete('/:id', authMiddleware, isCreator, postController.delete)


module.exports = router