import api from '../../../utils/api'

//Css
import style from './AddPet.module.css'

import { useState } from 'react'

import { useNavigate } from "react-router-dom";

//componentes
import PetForm from '../../../components/form/PetForm';

const AddPet = () =>{
    return(
        <section className={style.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText='Cadastrar um Pet'/>
        </section>
    )
}
export default AddPet