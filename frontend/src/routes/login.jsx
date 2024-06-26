import Input from "../components/form/Input"
import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import style from "../components/form/form.module.css"
import { Context } from '../context/UserContext'

const Login = () => {
    const [user, setUser] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const {login} = useContext(Context)
            
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    function handleCheckboxChange() {
        setShowPassword(!showPassword)
    }

    return (
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <input
                    id="showPassword" 
                    type="checkbox"
                    onChange={handleCheckboxChange}
                /> Mostrar Senha
                <input type="submit" value="Entrar" />
            </form>
        
            <p>
                Não tem conta? <Link to="/register">Click aqui</Link>
            </p>
        </div>
    )
}

export default Login
