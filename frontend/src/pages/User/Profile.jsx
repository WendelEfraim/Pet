import Input from "../../components/form/Input"
import {useState, useEffect} from 'react'
import useFlashMessage from "../../hooks/useFlashMessage"



//Style
import FormStyle from "../../components/form/form.module.css"
import style from "./Profile.module.css"
//Context
import { Context } from '../../context/UserContext'

//utils
import bus from "../../utils/bus"
import api from "../../utils/api"
import RoundedImage from "../../components/RoundedImage"





const Profile = () =>{

    const [user,setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(()=>{

        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.error("Erro ao buscar usuário", error);
        });
    }, [token]);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'sucess'
        
        const formData = new FormData()

        await Object.keys(user).forEach((key)=>
        formData.append(key, user[key])
        )

        const data = await api
        .patch(`/users/edit/${user._id}`, formData,{
            headers:{
                Authorization:`Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response)=>{

           return response.data

        }).catch((err)=>{

            msgType = 'error'
            return err.response.data

        })
        setFlashMessage(data.message, msgType)
    }
    
    return(
        <section>
            
        <form onSubmit={handleSubmit} className={FormStyle.form_container}>

            <div className={style.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage
                    src={
                        preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_REACT_APP_API}/images/user/${user.image}`
                    }
                        alt={user.name}
                    />
                    )}
            </div>

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