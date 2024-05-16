const router = require('express').Router()

const PetsController = require('../controller/PetsController')

//Middleware
const veryToken = require('../helpers/verify-token')
const { imageUpload } = require("../helpers/image-upload")


router.post(
    '/create',
    veryToken,
    imageUpload.array("image"),
    PetsController.create
)

router.get('/',PetsController.getAll)

router.get(
    '/getAllUserPets',
    veryToken,
    PetsController.getAllUserPets
)

router.get(
    '/myadoptions',
    veryToken,
    PetsController.getAllUserAdoptions
)

router.get('/:id',PetsController.getPetById)

router.delete('/:id', veryToken,PetsController.removePetById)

router.patch(
    '/:id',
    veryToken,
    imageUpload.array("image"),
    PetsController.updatePet
)

module.exports = router