import invitation from './invitation_picture.png';
import friends from './friends.png'
import { Link } from "react-router-dom";
import './evite.css'
import { useState } from 'react';
function Evite() {
    const [inviteSent, setInviteSent] = useState(false);
    return (
      <div className="Evite">
        <center><h1 color="#f4a1e9">Invitation</h1>
        <br /><br /><br />
        <EventInput />
        <button type="submit" color="Red" onClick={(e) => sendInvite(setInviteSent)}>Send Invitation</button>
        <h2>Invitees</h2></center>
        <img src={invitation} alt="Invitation" width="300" height="250" />
        <img src={friends} alt="Mike and Sully" width="260" height="330" align="right" />
        <br />
        <center><button type="button" align="Bottom"><Link to="/calendar">Back</Link></button></center>
      </div>
    );
  }
  
function sendInvite(setInviteSent) {
  
}

function EventInput() {
  return (
    <div className="flex-vertical-container">
      <p>Event Title</p>
      <input type="text" id="event-title" />
      <p>Event Description</p>
      <input type="text" id="event-description" />
      <div className="flex-horizontal-container">
        <div className="flex-vertical-container">
          <p>Event Start</p>
          <input type="date" id="event-start-date" />
          <input type="time" id="event-start-time" />
        </div>
        <div className="flex-vertical-container">
          <p>Event End</p>
          <input type="date" id="event-end-date" />
          <input type="time" id="event-end-time" />
        </div>
      </div>
      <select id="event-timezone">
        <option value="America/New_York">America/New_York</option>
      </select>
    </div>
  );
}

export default Evite;