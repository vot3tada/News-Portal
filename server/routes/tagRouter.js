const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')

router.post('/', tagController.add)
router.get('/',tagController.getAll)
//router.get('/:id',)


module.exports = router