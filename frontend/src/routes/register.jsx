import Input from "../components/form/Input"

const Register = () =>{
    return(
        <div>
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
                    text="Email:"
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
        </div>
    )
}
export default Register