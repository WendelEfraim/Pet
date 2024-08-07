import { useState } from "react";

import formStyles from './form.module.css'

import Input from './Input'

function PetForm({handleSubmit, petData, btnText}) {
    const [pet, setPets] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco","Preto","Caramelo","Cinza"]

    function onFileChange(e) {}

    function handleChange(e) {}

    return(
        <form className={formStyles}>
            <Input
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome"
                handleOnChange={handleChange}
                value={pet.name || ''}
            />
            <Input
                text="Idade do Pet"
                type="text"
                name="age"
                placeholder="Digite a idade"
                handleOnChange={handleChange}
                value={pet.age || ''}
            />
            <Input
                text="Peso do Pet"
                type="number"
                name="weigth"
                placeholder="Digite o peso em Kg"
                handleOnChange={handleChange}
                value={pet.weigth || ''}
            />
            <input type="submit"  value={btnText}/>
        </form>
    )
}
export default PetForm