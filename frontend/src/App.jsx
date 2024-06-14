import './App.css'

//reaproveitamento de estrutura
import { Outlet } from 'react-router-dom'

//Navbar
import Navbar from './components/Navbar'

//Container
import Container from './components/Container'

import Footer from './components/Footer'

//Context
import { UserProvider } from './context/UserContext'


function App() {

  return (
    <div>
      <UserProvider>
        <Navbar/>
          <Container>
            <Outlet/>
          </Container>
        <Footer/>
      </UserProvider>
      
      <footer><p>footer</p></footer>
    </div>
  )
}

export default App
