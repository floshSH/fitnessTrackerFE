import axios from "axios"

import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const params=useParams();
     const [password, setPassword]=useState('');

    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        
        e.preventDefault();
        resetPassword();
    }

    
    const resetPassword=async()=>{
        const email=params.email;
  
        const response= await axios.put("http://localhost:5000/user/resetPassword",{email, password});
        alert(response.data.message);
        if(response.data.message==="Password Changed successfully"){
           navigate('/');
        }
    }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center   ' style={{width:"100vw", height:"100vh"}}>
    <form className='border border-5 p-5' onSubmit={handleSubmit} style={{borderRadius:"25px"}}>
        <h1 className="text-center">Reset Password</h1>
       
        <div className="passwordDiv mt-5">
            <label >New password:</label>
            <input className="form-control mt-3" type="password"  name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
        </div>
       <div className="text-center mt-5"> <button className="btn btn-primary" type='submit'>Submit</button></div>
    </form>
</div>
  )
}

export default ResetPassword