const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')

router.post('/', tagController.add)
router.post('/link', tagController.linkPostToTag)
router.get('/', tagController.getAll)


module.exports = router