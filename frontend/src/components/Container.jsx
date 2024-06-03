import styles from './Container.module.css'

const Container = ({children}) =>{
    return(
       <main className={styles.Container}>
        {children}
       </main>
    )
}
export default Container