import  axios  from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    
     const handleSubmit=(e)=>{
        e.preventDefault();
         loginUser();
    }
    const navigate=useNavigate();
  
   


    const handleClick=()=>{
        navigate("/register");

    }
    const loginUser=async()=>{
      try {
     
        const response=await axios.post("https://fitnesstrackerbe.onrender.com/user/login",{email,password});
        if(response.data.message === "Login successful"){
          localStorage.setItem("token", response.data.token);
          console.log(localStorage.getItem('token'))
          
         sessionStorage.setItem('token',response.data.token  );
          alert("Login successful");
          navigate("/Home");
        }
        if(response.data.message === "Email not found"){
          alert("Email not found");
        }
        if(response.data.message === "Invalid password! password reset mail sent!!"){
          alert("Invalid password! password reset mail sent!!");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
 
    <div className='d-flex flex-column justify-content-center align-items-center   ' style={{width:"100vw", height:"100vh"}}>
        <form className='border border-5 p-5' onSubmit={handleSubmit} style={{borderRadius:"25px"}}>
            <h1 className='text-center'>LOGIN PAGE</h1>
            <div className="emailDiv mt-5">
                <label >email:</label>
                <input className="form-control" type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
            <div className="passwordDiv mt-5">
                <label >password:</label>
                <input className="form-control" type="password"  name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            </div>
            <div className="mt-5">
                <Link to="/resetpassword" >forgot Password?</Link>
              </div>
            <div className="d-flex justify-content-evenly mt-5">
              
            <div><button className='btn btn-primary' type='submit'>Submit</button>
            </div>
            <div><button className="btn btn-primary" onClick={handleClick}>Register</button></div>
       
            </div>
        </form>
         </div>
  )
}

export default Login
