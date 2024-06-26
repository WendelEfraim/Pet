import api from "../utils/api";
import useFlashMessage from './useFlashMessage'

// eslint-disable-next-line no-unused-vars
import{useState, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";


export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const history = useNavigate()


    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])
    
    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try{
            const data = await api.post('/users/register', user).then((response)=>{
                return response.data
            })

            await autheUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText,msgType)
    }
    
    async function autheUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        history('/')
    }

    async function logout() {
        let msgText = 'Logout realizado com sucesso'
        let msgType = 'sucess'
        
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.authorization = undefined
        history('/')

        setFlashMessage(msgText,msgType)
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso'
        let msgType = 'sucess'
        try{
            const data = await api.post('/users/login', user).then((response)=>{
                return response.data
            })

            await autheUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText,msgType)
    }

    return {authenticated, register, logout, login}
    
}