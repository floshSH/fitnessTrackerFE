
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from './InnerComponents/Navbar.jsx'

import MyContext  from './MyContext/MyContext.jsx'

const Home = () => {
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      navigate("/");
    }
  },[])
  
  const [click, setClick] = useState(false);
 

  

  //console.log(localStorage.getItem('token'))
 
  return (
    <div id='homepage'>
      <MyContext.Provider value={{click, setClick}}>
      <Navbar />
      
        
      </MyContext.Provider>
    </div>
      )
}

export default Home