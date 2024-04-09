const router = require('express').Router()

const UserController = require('../controller/UserController')

// middleware

const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require("../helpers/image-upload")

//routs

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/checkuser', UserController.checkUser)

router.get('/:id', UserController.getByUserbyId)

router.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single("image"),
    UserController.editUser,
)

console.log('2° - Estmos em Routes')

module.exports = router