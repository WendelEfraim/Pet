import Input from "../../components/form/Input"
import {useState, useEffect} from 'react'

//Style
import FormStyle from "../../components/form/form.module.css"
import style from "./Profile.module.css"
//Context
import { Context } from '../../context/UserContext'

const Profile = () =>{

    const [user, setUser] = useState({})

    function handleSubmit(e) {}

    function handleChange(e) {}

    function handleSubmit(e) {}

    function onFileChange(e) {}
    return(
        <section>
            <div className={style.profile_header}>
                <h1>Perfil</h1>
                <p>Visualizar imagem</p>
            </div>
        <form onSubmit={handleSubmit} className={FormStyle.form_container}>
                <Input
                    text="image"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite seu senha"
                    handleOnChange={handleChange}
                />
                 <Input
                    text="Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Salvar" />
        </form>
        </section>
    )
}
export default Profile