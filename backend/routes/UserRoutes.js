const router = require('express').Router()

const UserController = require('../controller/UserController')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/checkuser', UserController.checkUser)

console.log('2° - Estmos em Routes')

module.exports = router