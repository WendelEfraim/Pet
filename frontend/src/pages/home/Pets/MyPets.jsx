import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MyPets = () =>{
    const [pets, setPets] = useState([])
    return(
      <section>
        <dir>
            <h1>MyPets</h1>
        <Link to='/pet/add'>Cadastrar pet</Link>
        </dir>
        <div>
            {pets.length > 0 && <p>Meus Pets cadastrados</p>}
            {pets.length === 0 && <p>Não há pets cadastrados</p>}
        </div>
      </section>
    )
}
export default MyPets