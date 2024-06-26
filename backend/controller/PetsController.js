const Pet = require('../model/Pets')

//helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const objectId = require('mongoose').Types.ObjectId

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

    //todos os pets adotados

    static async getAllUserAdoptions(req,res){
        
        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const Pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt');
        console.log('user encontrados:', user._id);
        res.status(200).json({
            Pets
        })
    }

    //pegar pet pelo id

    static async getPetById(req,res){
        const id = req.params.id

        if(!objectId.isValid(id)){
            res.status(422)
            .json({
                mesage:'Id errado ou inexistente'
            })
            return
        }

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404)
            .json({
                mesage:'pet não encontrado!'
            })
        }

        res.status(200).json({
            pet: pet,
        })

    }

    //remover pet pelo id
    
    static async removePetById(req,res){
        
        const id = req.params.id

        // checar se o id existe
        if(!objectId.isValid(id)){
            res.status(422)
            .json({
                mesage:'Id inexistente'
            })
            return
        }

        // checar se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404)
            .json({
                mesage:'pet não encontrado!'
            })
            return
        }

        //checar se o usuario esta logado

        const token = getToken(req)
        const user = await getUserByToken(token)
        
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message:'Houve um problema em processar sua solicitação, tente novamente!'
            })
            return
        }

        await Pet.findByIdAndDelete(id)
        res.status(200).json({
            message:'Pet removido com sucesso!'
        })
    }

    static async updatePet(req,res){
        
        const id = req.params.id

        // checar se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404)
            .json({
                mesage:'pet não encontrado!'
            })
            return
        }

        //checar se o usuario esta logado

        if(!objectId.isValid(id)){
            res.status(422)
            .json({
                mesage:'Id inexistente'
            })
            return
        }

        //checar se o usuario esta logado

        const token = getToken(req)
        const user = await getUserByToken(token)
        
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message:'Houve um problema em processar sua solicitação, tente novamente!'
            })
            return
        }

        const {name, age, weight, color, available} = req.body
        
        const image = req.files

        const updatePet = {}


        if(!name){
            res.status(422).json({mesage:'Precisa inserir um nome!'})
            return
        }else{
            updatePet.name = name
        }

        if(!age){
            res.status(422).json({mesage:'Precisa inserir uma idade!'})
            return
        }else{
            updatePet.age = age
        }

        if(!weight){
            res.status(422).json({mesage:'Precisa inserir o peso!'})
            return
        }else{
            updatePet.weight = weight
        }

        if(!color){
            res.status(422).json({mesage:'Precisa inserir a cor!'})
            return
        }else{
            updatePet.color = color
        }

        if(image.length === 0){
            res.status(422).json({mesage:'Precisa inserir uma imagem!'})
            return
        }else{
             updatePet.image = []
            image.map((image)=>{
                updatePet.image.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id,updatePet)

        res.status(200).json({
            mesage:'Pet atualizado com sucesso!'
        })

    }

    static async schedulePet(req,res){

        const id = req.params.id
        
        // checar se o id existe
        
        if(!objectId.isValid(id)){
            res.status(422)
            .json({
                mesage:'Id inexistente'
            })
            return
        }

        // checar se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404)
            .json({
                mesage:'pet não encontrado!'
            })
            return
        }

        //checar se o usuario esta logado

        const token = getToken(req)
        const user = await getUserByToken(token)

        //checar se o Pet é do proprio usuario
        if(pet.user._id.toString() === user._id.toString()){
            res.status(422).json({
                message:'Você não pode agendar uma visita para seu próprio Pet!'
            })
         
            return
        }
      
        //checar se o Pet ja tem um adotante
        const carinha = ':)'
        if(pet.adopter){
            if(pet.adopter._id.toString() === user._id.toString()){
                res.status(422).json({
                    message:`Você ja agendou uma visita para este Pet! ${carinha}`
                })
                
                return
            }
        }

        //adotar pet
        
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        console.log("id do pet: "+pet.user.id)
        console.log(user.id)

        await Pet.findByIdAndUpdate(id,pet)

        res.status(200).json({
            mesage: `A visita foi agendada com sucesso! Por favor entre em contato com ${pet.user.name} pelo numero: ${pet.user.phone}  ${carinha}`
        })

    }

    static async concluedAdoption(req,res){

        const id = req.params.id
        
        // checar se o id existe
        
        if(!objectId.isValid(id)){
            res.status(422)
            .json({
                mesage:'Id inexistente'
            })
            return
        }

         // checar se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404)
            .json({
                mesage:'pet não encontrado!'
            })
            return
        }

        //checar se o usuario esta logado

        const token = getToken(req)
        const user = await getUserByToken(token)

        //verifica se o pet é do usuario
        
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message:'Houve um problema em processar sua solicitação, tente novamente!'
            })
            return
        }
        
        pet.available = false

        Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({
            mesage:`Parabens! Adoção do Pet '${pet.name}' foi realizada com sucesso!`
        })
        
    }
 
}