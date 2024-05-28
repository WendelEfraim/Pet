import { Link } from "react-router-dom"
import styles from "./navbar.module.css"
import Logo from "../assets/img/pata.png"

const Navbar = () =>{
    return(
        <nav className={styles.Navbar}>
            <div className={styles.logo_Navbar}>
                <img src={Logo} alt="My Pet" />
                <h2>My pet</h2>
            </div>

            <div className={styles.linkNavbar}>
            <Link className ={styles.link} to="/">Home</Link>
            <Link className ={styles.link} to="/login">Login</Link>
            <Link className ={styles.link} to="/register">Register</Link>
            </div>
        </nav>
    )
}
export default Navbar