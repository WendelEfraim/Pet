const Pet = require('../model/Pets')

//helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetsController{
    static async create(req,res){
        
        const {name, age, weight, color} = req.body
        
        const available = true

        if(!name){
            res.status(422).json({mesage:'Precisa inserir um nome!'})
            return
        }

        if(!age){
            res.status(422).json({mesage:'Precisa inserir uma idade!'})
            return
        }

        if(!weight){
            res.status(422).json({mesage:'Precisa inserir o peso!'})
            return
        }

        if(!color){
            res.status(422).json({mesage:'Precisa inserir a cor!'})
            return
        }

        const token = getToken(req)
        const user = getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

    }
}