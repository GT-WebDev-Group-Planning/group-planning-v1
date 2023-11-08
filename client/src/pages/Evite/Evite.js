import React, { useState } from 'react';
import invitation from './invitation_picture.png';
import friends from './friends.png'
import { Link } from "react-router-dom";
import './evite.css'
function Evite() {
    function Dropdown(){
        const [option, setOption] = useState('');
        const handleChange = (e) => {
        setOption(e.target.value);
        };
        return (
          <div>
            <select value={option} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
            <option value="Group 3">Group 3</option>
            </select>
          </div>
          );
    }
    function DisplayBox(props) {
      return (
        <div>
        <ul>
        {props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
        </div>
      );
    }
    return (
      <div className="Evite">
        <center><h1 color="#f4a1e9">Create Event</h1>
        <br /><br /><br />
        <h2>Group</h2>
        <Dropdown></Dropdown>
        <h2>Title</h2>
        <input class="title" type="text"></input>
        <h2>Description</h2>
        <input class="description" type="text"></input>
        <p>Start</p>
        <input type="datetime-local"></input>
        <p>End</p>
        <input type="datetime-local"></input>
        <button type = "submit">Send Invitation</button>
        <h2>Invitees</h2></center>
        <img src={invitation} alt="Invitation" width="300" height="250" />
        <center><DisplayBox title="Invitees" items={['friend1', 'friend2', 'friend3']}></DisplayBox></center>
        <img src={friends} alt="Mike and Sully" width="260" height="330" align="right" />
        <br />
        <button type="button" align="Bottom">Add Invitee</button>
        <button type="button" align="Bottom"><Link to="/calendar">Back</Link></button>
        <button type="button" align="Bottom"><Link to="/">Home</Link></button>
      </div>
    );
  }
  
  export default Evite;
  