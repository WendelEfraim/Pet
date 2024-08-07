import { Link } from "react-router-dom"
import styles from "./navbar.module.css"
import Logo from "../assets/img/pata.png"
import { useContext } from "react"

import  {Context}  from "../context/UserContext"

    const Navbar = () =>{
    const {authenticated, logout} = useContext(Context)

    return(
        <nav className={styles.Navbar}>
            <div className={styles.logo_Navbar}>
                <img src={Logo} alt="My Pet" />
                <h2>My pet</h2>
            </div>

            <div className={styles.linkNavbar}>
            <Link className ={styles.link} to="/">Home</Link>
            {authenticated ? (
                <>
                <li><Link className={styles.link} to='#'>Adotar Pet</Link></li>
                <li><Link className={styles.link} to = "pets/mypets">My Pets</Link></li>
                <li><Link className={styles.link} to = "user/profile">Perfil</Link></li>
                <li className={styles.link} onClick={logout}>Sair</li>
                </>
            ) : (
                <>
                 <Link className ={styles.link} to="/login">Login</Link>
                 <Link className ={styles.link} to="/register">Register</Link>
                </>
            )}
           
            </div>
        </nav>
    )
}
export default Navbar