import Input from "../components/form/Input"

import {useState} from 'react'

import {Link} from 'react-router-dom'

import style from "../components/form/form.module.css"


const Login = () =>{

    const [user, setUser] = useState({})
            
    function handleChange(e) {
        setUser({ ...user, [e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefalt()
        // enviar o usuario para o banco
        console.log(user)
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