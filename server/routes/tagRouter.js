const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')
const authMiddleware = require('../middleware/authMiddleware')
const isCreator = require('../middleware/isCreatorMiddleware')
const isAdmin = require('../middleware/isAdminMiddleware')

router.post('/', authMiddleware, isAdmin, tagController.add)
router.delete('/:id', authMiddleware, isAdmin, tagController.delete)
router.post('/link', authMiddleware, isCreator, tagController.linkPostToTag)
router.delete('/link', authMiddleware, isCreator, tagController.unlinkPostToTag)
router.get('/', tagController.getAll)


module.exports = router