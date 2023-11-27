import React, { useEffect, useState } from 'react';
import invitation from './invitation_picture.png';
import friends from './friends.png'
import { Link } from "react-router-dom";
import './evite.css'
function Evite({ userEmail, setUserEmail }) {
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
    const [inputText, setInputText] = useState('');
    const [itemList, setItemList] = useState([]);
    function handleInputChange(e){
      setInputText(e.target.value);
    };
  
    function handleAddItem(){
      if (inputText.trim() !== '') {
        setItemList([...itemList, inputText]);
        setInputText('');
      }
    };
    function handleSendInvite() {
      alert("Your invitation has been sent.");
    };
    return (
      <div className="Evite">
        <center><h1 className="createEvent">Create Event</h1>
        <br /><br /><br />
        <h2>Group</h2>
        <Dropdown></Dropdown>
        <h2>Title</h2>
        <input class="title" type="text" placeholder='Super Cool Event Yippee'></input>
        <h2>Description</h2>
        <input class="description" type="text" placeholder='Come to my super cool event or you fake'></input>
        <p>Start</p>
        <input type="datetime-local"></input>
        <p>End</p>
        <input type="datetime-local"></input>
        <button type = "submit" onClick={handleSendInvite}>Send Invitation</button>
        <h2>Invitees</h2></center>
        <img src={invitation} alt="Invitation" width="300" height="250" />
        <center><DisplayBox class="Invitees" items={itemList}></DisplayBox></center>
        <img src={friends} alt="Mike and Sully" width="260" height="330" align="right" />
        <br />
        <button type="button" align="Bottom" onClick={handleAddItem}>Add Invitee</button>
        <center><input class="invitee" type="text" placeholder='Invitee...' onChange={handleInputChange}></input></center>
        <button type="button" align="Bottom"><Link to="/calendar">Cancel</Link></button>
        <button type="button" align="Bottom"><Link to="/">Home</Link></button>
      </div>
    );
  }
  
  export default Evite;
  