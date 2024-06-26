import Input from "../components/form/Input"

import {useContext, useState} from 'react'

import {Link} from 'react-router-dom'

import style from "../components/form/form.module.css"

import { Context } from '../context/UserContext'


const Login = () =>{

    const [user, setUser] = useState({})
    const {login} = useContext(Context)
            
    function handleChange(e) {
        setUser({ ...user, [e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return(
        <div className={style.form_container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <Input
                text="Email"
                type="email"
                name="email"
                placeholder="Digite seu email"
                handleOnChange={handleChange}
            />
            <Input
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite seu senha"
                handleOnChange={handleChange}
            />
            <input type="submit" value="Entrar" />
        </form>
        <p>
            Não tem conta? <Link to="/register">Click aqui</Link>
        </p>
    </div>
    )
}
export default Login