const router = require('express').Router()
const  {authenticateUser} = require('../middelwares/authentication')
const {register, login, logout} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticateUser, logout)

module.exports = router