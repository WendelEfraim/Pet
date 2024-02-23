    const User = require('../model/Users')
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')

    //helpers
    const createUserToken = require('../helpers/create-user-token')
    const getToken = require('../helpers/get-token')

    module.exports = class UserController{ 
        static async register(req,res) {
            // res.json('Ola Mundo!')
            const { name, email, password, confirmpassword, phone} = req.body

            if(!name || !email || !password || !confirmpassword || !phone){
                res.status(422)
                .json({
                    message: "Favor preencher todos os campos"
                })
            }
            
            //confirmação de senha

            if(password !== confirmpassword){

                res.status(422)
                .json({
                    message: "Senhas não coincidem"
                })
                return
            };

            //check if user exists
            const userExists = await User.findOne({email:email})

                if(userExists) {
                res.status(422)
                .json({
                    message: 'Email já existe favor utilizar outro'
                })
                return

            }  

            //create a password
            
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            

            //create a user

            const user = new User({
                name,    // = name: name,       {isso acontece quando os nomes
                email,   // = email: email,      das variaveis sao identicos}
                phone,   // = phone: phone,    como o password nao é igual a passwordHash 
                password: passwordHash    // tem que ser desta forma para indicar que um será o outro
            })

            //salvar User no banco

            try{
                const newUser = await user.save() // para salvar

                await createUserToken(newUser, req, res)
            }catch(err){
                res.status(500).json({message: err})
            }
        }

        // função de login
        static async login(req, res) {
            const {email, password} = req.body

            if(!email) {
                res.status(422)
                .json({
                    message: "Favor inserir o email."
                })
            }
            
            if(!password){
                res.status(422)
                .json({
                    message: "Favor inserir sua senha."
                })
            }
            
            //Verificação de email cadastrado para login
            const user = await User.findOne({email:email})

                if(!user) {
                res.status(422)
                .json({
                    message: 'Email inexistente'
                })
                return

            }  

            const checkPassword = await bcrypt.compare(password, user.password)

            if(!checkPassword) {
                res.status(422)
                .json({
                    message: "Senha incorreta"
                })
                return
            }
            
            await createUserToken(user, req, res)
        }

        static async checkUser(req, res) {
            
            let userCorrent

            if(req.headers.authorization) {

                const token = getToken(req)
                const decoded = jwt.verify(token, 'nossoSecret')

                userCorrent = await User.findById(decoded.id)

                userCorrent.password = undefined

            } else{
                userCorrent = null
            }

            res.status(200).send(userCorrent)

        }

        static async getByUserbyId(req,res){
            const id = req.params.id
            const user = await User.findById(id).select('-password')
            if(!user){
                res.status(422)
                .json({
                    message: 'Usuario não encontrado!'
                    
                })
                return
            }
            res.status(200)
            .json({user})
        }

        static async editUser(req,res){
            res.status(200)
                .json({
                    message: 'Sucesso!'
                })
                return
        }
    }
    console.log('3° - estamos em controller')