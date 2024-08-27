import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ResetPasswordPage1 from './Components/ResetPasswordPage1.jsx'
import Home from './Components/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import ResetPassword from './Components/ResetPassword.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Components/InnerComponents/Dashboard.jsx'
import Workouts from './Components/InnerComponents/Workouts.jsx'
import Contact from './Components/InnerComponents/Contact.jsx'
import Navbar from './Components/InnerComponents/Navbar.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.js'




const router=createBrowserRouter([
    
    
    
        {
           path:"/" ,
           element:<Login/>
        },
      {
        path:"/register",
        element:<Register />
      },{
        path:"/resetpassword",
        element:<ResetPasswordPage1 />
      },
      {
        path:"/resetpassword/:email",
        element:<ResetPassword />
      },
      {
        path:"/Home",
        element:<Home />,
        children:[
         
          {
            path:"/Home/Dashboard",
            element:<Dashboard />
          },
          {
            path:"/Home/Workouts",
            element:<Workouts />
          },
          {
            path:"/Home/Contact",
            element:<Contact />
          }
        ]
        
      }

    ]
  )
  
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} ><App/></RouterProvider>
  
)
