
import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faClock } from "@fortawesome/free-solid-svg-icons"
import { useContext } from 'react';
import MyContext from '../MyContext/MyContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Workouts = () => {
  const { click, setClick } = useContext(MyContext);

  const [todayCharts, setTodayCharts] = useState([]);

  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {


    let date;
    const fetchData = async () => {
      if (selectedDate) {
        date = selectedDate;
        console.log(date);
      }
      if (!selectedDate) {
        date = new Date();
        console.log(date);
      }

      const response = await axios.put("https://fitnesstrackerbe.onrender.com/data/getByDate", { date }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data);
      if (response.data.partExcercise) {
        setTodayCharts(response.data.partExcercise)
        //console.log(todayCharts)
      }
    }
    fetchData();


  }, [])


  const handleChange = async (newDate) => {
    setTodayCharts([])
    // console.log(format(newDate.$d, 'yyyy-MM-dd'))
    setSelectedDate(newDate)
    let date = newDate.$d;
    const response = await axios.put("https://fitnesstrackerbe.onrender.com/data/getByDate", { date }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(response.data);
    if (response.data.partExcercise) {
      setTodayCharts(response.data.partExcercise)
      //console.log(todayCharts)
    }
    //console.log((newDate));

  }

  const currentPath = window.location.pathname;
  console.log(currentPath);


  const StyledStaticDatePicker = styled(StaticDatePicker)({
    '.MuiPickersToolbar-root': {
      color: '#1565c0',
      borderRadius: '2px',
      borderWidth: '1px',
      borderColor: '#2196f3',
      border: '1px solid',
      backgroundColor: '#90caf9',
    },
    '@media (max-width: 600px)': {
      '.MuiPickersToolbar-root': {
        // Adjust styles for smaller screens
        // For example:
        fontSize: '14px',
        padding: '8px',
      },
    },
  })
  return (



    <div className='m-5 d-flex flex-wrap  justify-content-between'>
      <div style={{ width: '300px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
          <StyledStaticDatePicker value={selectedDate}
            onChange={handleChange}

          />
        </LocalizationProvider>
      </div>
      <div style={{ flex: 1 }}>
        <div className='d-flex flex-wrap justify-content-center'>
          {todayCharts.length > 0 ?
            (todayCharts.map((item, index) => {
              return (<div className="card mt-5 ms-5  shadow" key={index} style={{ width: "15rem", height: "9rem", fontSize: "13px" }}>
                <div className='ms-4 mt-3 text-primary' >#{item.part}</div>
                <div className='text-dark ms-4 mt-1' style={{ fontWeight: "bold", fontFamily: "inherit" }}>
                  <h5>{item.squat}</h5>

                </div>
                <div className='ms-4 '> Count :{item.sets} sets * {item.reps} reps</div>
                <div className='ms-4 mt-1'><FontAwesomeIcon icon={faDumbbell} /> {item.weight} kg <FontAwesomeIcon icon={faClock} /> {item.time} mins</div>


              </div>)
            })) : ""

          }

        </div>

      </div>

    </div>







  )
}

export default Workouts
