import './App.css'

//reaproveitamento de estrutura
import { Outlet } from 'react-router-dom'

//components
import Navbar from './components/Navbar'
import Container from './components/Container'
import Footer from './components/Footer'
import Message from './components/Message'


//Context
import { UserProvider } from './context/UserContext'


function App() {

  return (
    <div>
      <UserProvider>
        <Navbar />
        <Message/>
          <Container>
            <Outlet/>
          </Container>
        <Footer/>
      </UserProvider>
    </div>
  )
}

export default App
