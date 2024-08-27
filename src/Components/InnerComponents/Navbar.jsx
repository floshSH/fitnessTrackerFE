
import * as React from 'react';
import { useContext, useState } from 'react';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';


import MyContext from '../MyContext/MyContext';
import Dashboard from './Dashboard';
import axios from 'axios';


const Navbar = () => {
  const [click2, setClick2] = useState(false);
  const { click, setClick } = useContext(MyContext);


  //console.log(typeof(click), typeof(setClick));
  //const {dashboard, setDashboard}=useContext(DashboardContext);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.clear();
    navigate("/");
  }


  const currentPath = window.location.pathname;
  //console.log(currentPath);

  const handleProfile = async () => {
    setClick2(!click2);
    if (!click2) {
      const response = await axios.get("https://fitnesstrackerbe.onrender.com/user/getprofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          setUser(res.data.user)
        })
    }
  }


  return (
    <div className=' d-flex flex-column' >
      <div style={{ cursor: "pointer" }}>
        <div className=' shadow p-4 d-flex flex-row justify-content-between align-items-center mt-1' style={{ backgroundColor: "#4eb3ea" }}>
          <div className=' ms-5 d-flex justify-content-around align-items-center ' style={{ width: "13rem" }}>
            <div >
              <FontAwesomeIcon id='navPhone' onClick={() => setClick(!click)} icon={faBars} style={{ position: "relative" }} />
              <img id='navLap' src="Logo.png" width={50} alt="..." />



            </div>
            <div><h2>Fit-Track</h2></div>
          </div>
          <div className='d-flex ' id='navLap' >
            <NavLink className="p-3" style={({ isActive }) => ({
              color: isActive || currentPath === "/Home" ? 'white' : 'black',
              borderBottom: isActive || currentPath === "/Home" ? '4px solid white' : ""
            })} to={"/Home/dashboard"} id='qwerty'>Dashboard</NavLink>
            <NavLink style={({ isActive }) => ({
              color: isActive ? 'white' : 'black',
              borderBottom: isActive ? '4px solid white' : ""
            })} className="p-3" to={"/Home/workouts"} id='qwerty'>Workouts</NavLink>
            <NavLink style={({ isActive }) => ({
              color: isActive ? 'white' : 'black',
              borderBottom: isActive ? '4px solid white' : ""
            })} className="p-3" to={"/Home/contact"} id='qwerty'>Contact</NavLink>
          </div>






          <div className='mx-5'><Avatar style={{ position: "relative" }} onClick={handleProfile} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>





        </div>

        {click2 ? (
          <div className='bg-secondary p-2 mx-4 text-light text-end' style={{ position: "absolute", right: "0", fontSize: "large", borderRadius: "10px" }}>

            <div>
              <div className='p-3'>{user.username}</div>
              <div className='p-3'>{user.email}</div>
              <div className='p-3' onClick={logOut}><FontAwesomeIcon icon={faRightFromBracket} />  LogOut</div>
            </div>
          </div>
        ) : ""

        }




      </div>

      <div className='d-flex flex-wrap'>
        {click ? <div className='mx-2 shadow-lg' id='navPhone' style={{ width: "10rem", backgroundColor: "#8888a7" }}>
          <div className='d-flex flex-column ' id='navPhone' style={{ top: "50px", height: "10vh" }} >
            <NavLink className="p-3" style={({ isActive }) => ({
              color: isActive || currentPath === '/Home' ? 'white' : 'black',
              borderBottom: isActive || currentPath === '/Home' ? '2px solid white' : ""
            })} to={"/Home/dashboard"} id='navPhone'>Dashboard</NavLink>
            <NavLink style={({ isActive }) => ({
              color: isActive ? 'white' : 'black',
              borderBottom: isActive ? '2px solid white' : ""
            })} className="p-3" to={"/Home/workouts"} id='navPhone'>Workouts</NavLink>
            <NavLink style={({ isActive }) => ({
              color: isActive ? 'white' : 'black',
              borderBottom: isActive ? '2px solid white' : ""
            })} className="p-3" to={"/Home/contact"} id='navPhone'>Contact</NavLink>
          </div>
        </div>
          : null
        }
        <div style={{ flex: 1 }}>

          {currentPath === "/Home" ? <Dashboard /> : ''}
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Navbar;
