const mongoose = require('mongoose')
const {Schema} =  mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        image:{
            type: String
        },
        phone:{
            type: String,
            require: true
        }
    },
    {timerstamps: true},
    )
)

module.exports = User