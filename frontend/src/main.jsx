import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configurando router

import {createBrowserRouter, RouterProvider}from'react-router-dom'

import Home from './routes/home.jsx'
import Login from './routes/login.jsx'
import Register from './routes/register.jsx'
//pagina de erro
import ErrorPage from './routes/errorPage.jsx'

import ContactTutor from './routes/ContactSuport.jsx'

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

      //rotas aninhadas - identificador unico
      {
        path: "/contact/:id",
        element:<ContactTutor/>
      }

    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
