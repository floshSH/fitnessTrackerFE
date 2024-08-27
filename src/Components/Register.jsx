import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [email, setEmail]=useState('');
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    userRegister();
   
  }

  const navigate=useNavigate();
  const handleClick=()=>{
      navigate("/");

  }

  const userRegister=async()=>{
    const response=await axios.post("http://localhost:5000/user/register",{username,email,password});
    console.log(response.data.message);
    if(response.data.message === "User registered successfully"){
      navigate("/");
    }
    if(response.data.message === "Email Already Exists"){
      alert("Email Already Exists");
    }
    if(response.data.message === "Username Already Exists"){
      alert("Username Already Exists");
    }
  }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center   ' style={{width:"100vw", height:"100vh"}}>
        <form className='border border-5 p-5'  style={{borderRadius:"25px"}}>
        <h1>Register Page</h1>
       
          
            <div className='mt-5'>
              <label >Username :</label>
            <input className='form-control' type="text" value={username} name='username' onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div className='mt-5'>
              <label >email:</label>
              <input className='form-control' type="email" value={email} name='email' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className='mt-5'>
              <label >Password:</label>
              <input className='form-control' type="password" value={password} name='password' onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div className="d-flex justify-content-evenly mt-5">
              
            <div><button className='btn btn-primary' type='submit' onClick={handleSubmit}>Submit</button>
            </div>
            <div><button className="btn btn-primary" onClick={handleClick}>Login</button></div>
       
            </div>
          



        </form>
    </div>
  )
}

export default Register

//$2b$10$SKTWmSk1K6pqXuV.RywYtepTBA8aMP/yOgsTineYzzGFbJXznyU9u