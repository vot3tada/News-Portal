const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/isAdminMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware,userController.auth)
router.put('/', authMiddleware, isAdmin, userController.roleChanger)



module.exports = router