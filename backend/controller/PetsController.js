const Pet = require('../model/Pets')

//helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const User = require('../model/Users')

module.exports = class PetsController{
    static async create(req,res){
        try{
        const {name, age, weight, color} = req.body
        
        const image = req.files

        const available = true

        //Valitations

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
        if(image.length === 0){
            res.status(422).json({mesage:'Precisa inserir uma imagem!'})
            return
        }

        //Get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //Create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        })
        console.log(pet)
        

            const newPet = await pet.save()
            res.status(201).json({
                message: "Pet cadastrado com sucesso!",
                newPet,
            })
        } catch (err) {
            res.status(500).json({message: err})
        }
    }

    //todos os pets em ordem do mais novo para o mais velho

    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({
            pets:pets,
        })
    }

    //todos os pets do usuario

    static async getAllUserPets(req,res){
        
        //Get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        const userPets = await Pet.find({'user._id': user._id}).sort('-createdAt')
        
        res.status(200).json({
            userPets,
        })
    }

}