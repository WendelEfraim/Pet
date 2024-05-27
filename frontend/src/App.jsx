import './App.css'

//reaproveitamento de estrutura
import { Outlet } from 'react-router-dom'

//Links Navbar
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <Navbar/>
      <h1>My Pet!</h1>
      <Outlet/>
      <footer><p>footer</p></footer>
    </div>
  )
}

export default App
