const { error } = require('console');
const multer = require('multer');
const path = require('path');


// Destination to store the images
const imageStore = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ""
        
        if(req.baseUrl.includes("users")) {
            folder = "user"
        }else if(req.baseUrl.includes("pets")){
            folder = "pet"
        }

        cb(null, `public/images/${folder}`)//'public/images/'+folder
    },
    
    filename: function(req, file, cb){
        cb(null, Date.now()+String(Math.floor(Math.random() * 1000))+path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor envie apenas arquivos .png ou .jpg'))
        }
        cb(undefined, true)
    },
})
module.exports = { imageUpload }