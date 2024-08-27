import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faClock, faFireFlameCurved, faChartLine } from "@fortawesome/free-solid-svg-icons"
import { BarChart } from '@mui/x-charts/BarChart';
import { LuDumbbell } from "react-icons/lu";
import { Dropdown } from 'react-bootstrap';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';


const Dashboard = () => {
  const [dropdown, setDropdown] = useState("Select");
  const [todayCharts, setTodayCharts] = useState([]);
  const [weekCharts, setWeekCharts] = useState([1]);
  const [monthCharts, setMonthCharts] = useState([1]);

  const [formData, setFormData] = useState({
    body_weight: "",
    squat: "",
    sets: "",
    reps: "",
    weight: "",
    time: "",
    part: ""

  });

  useEffect(() => {


    const fetchData = async () => {
      try {
        //console.log("hii")
        const response = await axios.get("https://fitnesstrackerbe.onrender.com/data/getToday", {
          headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const dataObj = response.data.data;
        //console.log(dataObj.partExcercise)
        if (dataObj !== null) {
          setTodayCharts(dataObj.partExcercise);
          setWeekCharts(dataObj.WeekCalorie);
          setMonthCharts(dataObj.monthCalorieArray)
          // console.log(dataObj, weekCharts)
        }

        //console.log(response.data.data)

      } catch (error) {
        console.log(error);
      }


    }
    fetchData();

  }, [])
  //console.log(todayCharts,monthCharts,weekCharts);


  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update formdata
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  let todayBurn = 0, workoutCount = 0;
  if (todayCharts) {
    workoutCount = todayCharts.length
    todayCharts.forEach((val, ind) => {

      todayBurn += val.calories_burned

    })

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dropdown === "Select") {
      alert("Please select a part of body")
    }
    else {
      formData.part = dropdown;
      console.log(formData)
      const response = await axios.post("https://fitnesstrackerbe.onrender.com/data/post", { formData }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(response.data)
      const dataObj1 = response.data;
      const response2 = await axios.get("https://fitnesstrackerbe.onrender.com/data/getToday", {
        headers: {

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const dataObj = response2.data.data;
      console.log(dataObj.partExcercise)
      if (dataObj !== null) {
        setTodayCharts(dataObj.partExcercise);
        setWeekCharts(dataObj.WeekCalorie);
        setMonthCharts(dataObj.monthCalorieArray)
        // console.log(dataObj, weekCharts)
      }
      // Navigate("/Home/dashboard")
      if (dataObj1 !== null) {
        setFormData({
          body_weight: "",
          squat: "",
          sets: "",
          reps: "",
          weight: "",
          time: "",
          part: ""
        })
        // console.log(dataObj, weekCharts)
      }
    }

  }

  const currentPath = window.location.pathname;
  //console.log(currentPath);


  return (


    <div className='ms-3 container ' >
      <div className='ms-4 mt-4'><h3>Dashboard</h3></div>

      <div className='d-flex text-align-end flex-wrap m-4 justify-content-evenly align-items-center'>
        <div className="card m-2 shadow" style={{ width: "20rem", height: "10rem", position: "relative" }}>
          {/* <FontAwesomeIcon style={{position:"absolute", top:"10px", right:"10px"}} icon="faFire" /> */}
          <div className="card-body  d-flex flex-column">
            <div className='text-primary p-1' >Calories Burned</div>
            <div style={{ position: "absolute", right: "30px", backgroundColor: "#f5ecbe", padding: "8px", borderRadius: "8px" }}><FontAwesomeIcon color='#ec4d09' icon={faFireFlameCurved} /></div>
            <div className='d-flex p-1'><span><h2>{

              todayBurn.toFixed(2)

            } </h2></span> <span style={{ fontSize: "10px" }}>Kcal</span></div>
            <div className='p-1'><p>total calories burned today</p></div>
          </div>
        </div>
        <div className="card m-2 shadow" style={{ width: "20rem", height: "10rem", position: "relative" }}>
          {/* <FontAwesomeIcon style={{position:"absolute", top:"10px", right:"10px"}} icon="faFire" /> */}
          <div className="card-body d-flex flex-column">
            <div className='text-primary p-1' >Workouts</div>
            <div style={{ backgroundColor: "#3a3a3b", position: "absolute", right: "30px", padding: "7px", borderRadius: "8px" }}><LuDumbbell color='#00acf9' /></div>
            <div className='d-flex p-1'><span><h2>{todayCharts ? todayCharts.length : 0} </h2></span> </div>
            <div className='p-1'><p>total no of workouts for today</p></div>
          </div>
        </div>
        <div className="card m-2 shadow" style={{ width: "20rem", height: "10rem", position: "relative" }}>
          {/* <FontAwesomeIcon style={{position:"absolute", top:"10px", right:"10px"}} icon="faFire" /> */}
          <div className="card-body d-flex flex-column">
            <div className='text-primary p-1' >Average Calories Burned</div>
            <div style={{ position: "absolute", right: "30px", padding: "7px", borderRadius: "8px" }}><FontAwesomeIcon color='#ff3d4e' icon={faChartLine} /></div>

            <div className='d-flex p-1'><span><h2>{todayCharts ? ((todayBurn / todayCharts.length).toFixed(2)) : 0} </h2></span> <span style={{ fontSize: "10px" }}>Kcal</span></div>
            <div className='p-1'><p>Average calories burned on each workout</p></div>
          </div>
        </div>
      </div>






      <div className='d-flex text-align-end flex-wrap m-4 justify-content-evenly align-items-center'>


        <div className='card shadow-lg mx-1 mt-4 ms-1' style={{ width: "20rem", height: "20rem" }}>
          <h5 className='ms-4 mt-3 text-primary'>Weekly Data</h5>
          <BarChart
            xAxis={[{ scaleType: 'band', data: weekCharts.map(subArray => subArray[1]) }]}
            series={[{ data: weekCharts.map(subArray => subArray[0]) }]}
            width={330}
            height={250}
          />
        </div>

        <div className='card shadow-lg mx-1 mt-4 ms-1' style={{ width: "20rem", height: "20rem" }}>
          <h5 className='ms-4 mt-3 text-primary'>Monthly Data</h5>
          <PieChart
            series={[
              {
                data: Object.entries(monthCharts[0]).map(([label, value], id) => ({
                  id,
                  value,
                  label
                }))
                ,
                innerRadius: "80%",
                outerRadius: "20%",
                paddingAngle: 2

              },
            ]}
            height={200}
          />




        </div>


        <div className='card shadow-lg mx-1 mt-4 ms-1' style={{ width: "20rem", height: "20rem" }}>
          <form onSubmit={handleSubmit}>
            <div className='d-flex m-3 flex-row justify-content-between align-items-center' >
              <div className="card-title ms-4 text-primary " ><h5>Workouts</h5></div>

              <div className='ms-2 text-center' style={{
                display: 'block',
              }}>
                <Dropdown name="workouts" >
                  <Dropdown.Toggle variant="success">
                    {dropdown}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setDropdown("Back")} value="Back" >
                      Back
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setDropdown("Shoulder")} value="Shoulder">
                      Shoulder
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setDropdown("ABS")} value="ABS">
                      ABS
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setDropdown("Legs")} value="Legs">
                      Legs
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setDropdown("Chest")} value="Chest">
                      Chest
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => setDropdown("Full_Body")} value="Full_Body">
                      Full_Body
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </div>

            </div>


            <div className=' d-flex mb-4 mt-1 ms-4 mx-4 justify-content-between mb-2'>
              <span>Body Weight</span>
              <span><input type="number" name='body_weight' value={formData.body_weight} onChange={handleChange} className="form-control mx-2" style={{ width: "5rem", height: "30px" }} required /></span>
              <span>squat</span>
              <span><input type="text" name='squat' value={formData.squat} onChange={handleChange} className="form-control mx-2" style={{ width: "5rem", height: "30px" }} required /></span>
            </div>

            <div className='d-flex mb-4 mt-1 ms-4 mx-4 justify-content-between align-items-center'>
              <span>Sets :</span>
              <span><input type="number" name='sets' value={formData.sets} onChange={handleChange} className="form-control" style={{ width: "5rem", height: "30px" }} required /></span>
              <span>Reps :</span>
              <span><input type="number" name='reps' value={formData.reps} onChange={handleChange} className="form-control" style={{ width: "5rem", height: "30px" }} required /></span>
            </div>
            <div className='d-flex mb-4 mt-1 ms-4 mx-4 justify-content-between align-items-center'>
              <span>Weight :</span>
              <span><input type="number" name='weight' value={formData.weight} onChange={handleChange} className="form-control" style={{ width: "5rem", height: "30px" }} required /></span>
              <span>Time :</span>
              <span><input type="number" name='time' value={formData.time} onChange={handleChange} className="form-control" style={{ width: "5rem", height: "30px" }} required /></span>
            </div>

            <div className='text-center mt-2'>
              <button className='btn btn-primary' type='submit' style={{ width: "13rem" }}>Add</button>
            </div>
          </form >
        </div>

      </div>




      <div className="d-flex flex-wrap justify-content-center">
        {todayCharts ?
          (todayCharts.map((item, index) => {
            return (<div className="card m-4 shadow" key={index} style={{ width: "15rem", height: "9rem", fontSize: "13px" }}>
              <div className='ms-4 mt-3 text-primary' ><h6>#{item.part}</h6></div>
              <div className='text-dark ms-4 mt-1' style={{ fontWeight: "bold", fontFamily: "inherit" }}>
                <h5>{item.squat}</h5>

              </div>
              <div className='ms-4 '> Count :{item.sets} sets * {item.reps} reps</div>
              <div className='ms-4 mt-1'><FontAwesomeIcon icon={faDumbbell} /> {item.weight}kg <FontAwesomeIcon icon={faClock} /> {item.time} mins</div>


            </div>)
          })) : ""

        }

      </div>



    </div>



  )
}

export default Dashboard
