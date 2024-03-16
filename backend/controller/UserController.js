    const User = require('../model/Users')
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')

    //helpers
    const createUserToken = require('../helpers/create-user-token')
    const getToken = require('../helpers/get-token')
    const getUserByToken = require('../helpers/get-user-by-token')

    module.exports = class UserController{ 
        static async register(req,res) {
            // res.json('Ola Mundo!')
            const { name, email, password, confirmpassword, phone} = req.body

            if(!name || !email || !password || !confirmpassword || !phone){
                res.status(422)
                .json({
                    message: `falta preencher:${!name ? ' Nome' : ''}${!phone ? ' Telefone' : ''}`
                })
                return
            }
            if(!email){
                res.status(422)
                .json({
                    message:"Por favor insira um email"
                })
            }

            if(!password){
                res.status(422)
                .json({
                    message:"Por favor insira uma senha"
                })
            }

            if(!confirmpassword){
                res.status(422)
                .json({
                    message:"Por favor confirme a senha"
                })
            }

            if(!phone){
                res.status(422)
                .json({
                    message:"Por favor insira um numero para contato"
                })
            }
            
            //confirmação de senha

            if(password !== confirmpassword){

                res.status(422)
                .json({
                    message: "Senhas não coincidem"
                })
                return
            }

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
                console.log(userCorrent)
                userCorrent.password = undefined

            }else{
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
            
            const id = req.params.id
            

            //check if user exists
            const token = getToken(req)
            const user = await getUserByToken(token)
        
        
           const {name, email, phone, password, confirmpassword} = req.body
           
           let img= ''

           
           if(!name){
                res.status(422)
                .json({
                    message: "Digite um nome"
                })
                return
            }
           
            user.name = name

            if(!email){
                res.status(422)
                .json({
                    message: "Obrigadtorio email"
                })
                return
            }

            //check if email already taken
            const userExists = await User.findOne({email})

            if(user && user.email !== email && userExists){
                res.status(422)
                .json({
                    message: "Email já existe, por favor digite outro email"
                })
                return
            }

            user.email=email

            if(!phone){
                res.status(422)
                .json({
                    message: "Digite um numero de celular"
                })
            }

            user.phone=phone

           if(password !=confirmpassword){
                res.status(422)
                .json({
                    message: "Senhas nao são iguais"
                })
                return
           }else if(password === confirmpassword && password != null){
                //creating a password
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(password, salt)
                user.password = passwordHash
           }

           try{

                // returns updated data
                await User.findOneAndUpdate(
                    {_id:user.id},
                    {$set: user},
                    {new: true}
                )

                res.status(200)
                .json({
                    message: "Usuario atualizado com sucesso!"
                })

           }catch(err){
                res.status(500)
                .json({
                    message: err
                })
                return
           }
           console.log(user)
        }
    }
    console.log('3° - estamos em controller')