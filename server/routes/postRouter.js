const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const isCreator = require('../middleware/isCreatorMiddleware')
const isAdmin = require('../middleware/isAdminMiddleware')

router.get('/', postController.getAll)
router.get('/my', authMiddleware, postController.getOwn),
router.get('/smart', authMiddleware, postController.getSmartAll)
router.get('/:id', authMiddleware, userController.saveHistory, postController.getOne)
router.post('/', authMiddleware, isCreator, postController.add)
router.post('/:id', authMiddleware, postController.likeorUnlikePost)
router.put('/:id', authMiddleware, isCreator, postController.edit)
router.delete('/:id', authMiddleware, isCreator, postController.delete)
router.post('/like/:id', authMiddleware, postController.likeorUnlikePost)
router.get('/like/:id', postController.getLikes)


module.exports = router