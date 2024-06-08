import Input from "../components/form/Input"

import {Link} from 'react-router-dom'

import style from "../components/form/form.module.css"

const Register = () =>{
    return(
        <div className={style.form_container}>
            <h1>Registrar</h1>
            <form>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={HashChangeEvent}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={HashChangeEvent}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={HashChangeEvent}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite seu senha"
                    handleOnChange={HashChangeEvent}
                />
                <Input
                    text="Confirme sua senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={HashChangeEvent}
                />
                <input type="submit" value="registrar" />
            </form>
            <p>
                Já tem conta? <Link to="/login">Click aqui</Link>
            </p>
        </div>
    )
}
export default Register