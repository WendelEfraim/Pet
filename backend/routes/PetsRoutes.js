const router = require('express').Router()

const PetsController = require('../controller/PetsController')

//Middleware
const veryToken = require('../helpers/verify-token')

router.post('/create', veryToken,PetsController.create)

module.exports = router