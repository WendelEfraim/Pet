const jwt = require('jsonwebtoken')

const User = require('../model/Users')


// obter usuario por token

const getUserByToken = async (token) =>{

    if(!token){
        return res.status(401)
        .json({
            message: 'Acesso negado!'
        })
    }
    
    const decoded = jwt.verify(token,'nossoSecret')
    const userId = decoded._id
    const user = await User.findOne({id:userId})
    return user
    
}
module.exports = getUserByToken