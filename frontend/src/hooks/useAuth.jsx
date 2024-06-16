import api from "../utils/api";

// eslint-disable-next-line no-unused-vars
import{useState, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    
    async function register(user) {
        
        try{
            const data = await api.post('/users/register', user).then((response)=>{
                return response.data
            })
            console.log(data)
        } catch(error){
            console.log(error)
        }
    }
    
    return {register}
}