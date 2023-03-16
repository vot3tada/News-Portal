const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')
const authMiddleware = require('../middleware/authMiddleware')
const isCreator = require('../middleware/isCreatorMiddleware')
const isAdmin = require('../middleware/isAdminMiddleware')

router.post('/', authMiddleware, isCreator, tagController.add)
router.post('/link', authMiddleware, isCreator, tagController.linkPostToTag)
router.get('/', authMiddleware, tagController.getAll)


module.exports = router