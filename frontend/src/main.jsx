import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configurando router

import {createBrowserRouter, RouterProvider}from'react-router-dom'

import Home from './routes/home.jsx'
import Login from './routes/login.jsx'
import Register from './routes/register.jsx'
import Profile from './pages/User/Profile'
import MyPets from './pages/home/Pets/MyPets.jsx'
import AddPet from './pages/home/Pets/AddPet.jsx'
//pagina de erro
import ErrorPage from './routes/errorPage.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    //pagina de erro
    errorElement: <ErrorPage/>,
    
    children: [
      {
        path: "/",
        element:<Home />
      },
      {
        path: "register",
        element:<Register />
      },
      {
        path: "login",
        element:<Login />
      },
      {
        path: "user/profile",
        element:<Profile />
      },
      {
        path: "pet/add",
        element:<AddPet />
      },
      {
        path: "pets/mypets",
        element:<MyPets />
      }
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
