import { Link } from "react-router-dom"
import styles from "./navbar.module.css"

const Navbar = () =>{
    return(
        <nav className={styles.Navbar}>
            <Link className ={styles.link} to="/">Home</Link>
            <Link className ={styles.link} to="/login">Login</Link>
            <Link className ={styles.link} to="/register">Register</Link>
        </nav>
    )
}
export default Navbar