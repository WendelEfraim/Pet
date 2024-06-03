import './App.css'

//reaproveitamento de estrutura
import { Outlet } from 'react-router-dom'

//Navbar
import Navbar from './components/Navbar'

//Container
import Container from './components/Container'


function App() {

  return (
    <div>
      <Navbar/>
      <Container>
        <Outlet/>
      </Container>
      
      <footer><p>footer</p></footer>
    </div>
  )
}

export default App
