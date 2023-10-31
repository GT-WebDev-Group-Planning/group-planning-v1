import React, { useState } from 'react';
import invitation from './invitation_picture.png';
import friends from './friends.png'
import { Link } from "react-router-dom";
function Evite() {
    function Dropdown(){
        const [option, setOption] = useState('');
        const handleChange = (e) => {
        setOption(e.target.value);
        return (
          <div>
            <select value={option} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="Group 1">Option 1</option>
            <option value="Group 2">Option 2</option>
            <option value="Group 3">Option 3</option>
            </select>
            <p>{option}</p>
          </div>
          );
        };
    }
    return (
      <div className="Evite">
        <center><h1 color="#f4a1e9">Create Event</h1>
        <br /><br /><br />
        <h2>Group</h2>
        <Dropdown></Dropdown>
        <h2>Description</h2>
        <input type="text"></input>
        <p>Date{"\t"}{"\t"}{"\t"}{"\t"}Time</p>
        <button type = "submit" color="Red">Send Invitation</button>
        <h2>Invitees</h2></center>
        <img src={invitation} alt="Invitation" width="300" height="250" />
        <img src={friends} alt="Mike and Sully" width="260" height="330" align="right" />
        <br />
        <button type="button" align="Bottom"><Link to="/calendar">Back</Link></button>
        <button type="button" align="Bottom"><Link to="/">Home</Link></button>
      </div>
    );
  }
  
  export default Evite;
  