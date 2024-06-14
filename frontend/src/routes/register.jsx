import {useContext, useState} from 'react'

import Input from "../components/form/Input"

import {Link} from 'react-router-dom'

import style from "../components/form/form.module.css"

//Context
import { Context } from '../context/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

            
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return(
        <section className={style.form_container}>
            
           

            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite seu senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirme sua senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Registrar" />
            </form>
            <p>
                Já tem conta? <Link to="/login">Click aqui</Link>
            </p>
        </section>
    )
}
export default Register