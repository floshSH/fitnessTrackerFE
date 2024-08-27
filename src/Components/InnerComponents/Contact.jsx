import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons"

import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
  const [dropdown, setDropdown] = useState('select');
  const [formData, setFormData] = useState({
    issueType: "",
    issueDetails: ""
  })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (dropdown === 'select') {
      alert('Please select the type of issue')
    }
    else if (formData.issueDetails === "") {
      alert('Please describe your issue')
    }
    else {
      formData.issueType = dropdown;
      axios.post("https://fitnesstrackerbe.onrender.com/issue/postIssue", { formData }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
          alert(`${res.data.message}`)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <div className='d-flex p-5 justify-content-center'>
      <form   >

        <div className='shadow-lg  p-5' style={{ height: "100vh", width: "30rem", borderRadius: "15px" }}>
          <div className='text-center'><FontAwesomeIcon color='#f65400' fontSize={"5rem"} icon={faEnvelopeOpenText} /></div>
          <div className='text-center mt-3'><h3>Contact Us</h3></div>

          <div className='mb-5'>
            <div className='mt-5'><label>Select your Type of issue</label></div>
            <div className='mt-4'><Dropdown name="Issues" >
              <Dropdown.Toggle variant="warning">
                {dropdown}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDropdown("Application Malfunction")} value="Back" >
                  Application Malfunction
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdown("Wrong Entries")} value="Shoulder">
                  Wrong Entries
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdown("Wrong calorie Calculation")} value="ABS">
                  Wrong calorie Calculation
                </Dropdown.Item>


              </Dropdown.Menu>
            </Dropdown></div>

          </div>
          <div >
            <div className='mb-3'>
              <label > Describe Your Issues</label>
            </div>
            <div className='text-center'>
              <textarea className='p-3' placeholder='Describe your issue here' onChange={handleChange} style={{ borderRadius: "15px", width: "20rem", height: "8rem" }} name="issueDetails" required></textarea>
            </div>
          </div>


          <div className='text-center p-5 '><button type='submit' className='btn btn-primary' onClick={handleSubmit}>submit</button></div>

        </div>

      </form>
    </div>
  )
}

export default Contact
