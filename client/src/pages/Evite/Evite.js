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
        <InvitationInput />
        <button color="Red" onClick={
          () => {
            sendInvite(setInviteSent);
          }
        }>Send Invitation</button>
        <h2>Invitees</h2></center>
        <img src={invitation} alt="Invitation" width="300" height="250" />
        <img src={friends} alt="Mike and Sully" width="260" height="330" align="right" />
        <br />
        <center><button type="button" align="Bottom"><Link to="/calendar">Back</Link></button></center>
      </div>
    );
  }

async function sendInvite(setInviteSent) {
  // get invitation data from inputs
  // format dates and times into ISO datetimes

  // dates: YYYY-MM-DD, times: HH:MM
  // ISO: YYYY-MM-DD'T'HH:MM:SS-OFFSET, where OFFSET is HH:MM
  const startDate = document.getElementById('event-start-date').value;
  const startTime = document.getElementById('event-start-time').value;
  const endDate = document.getElementById('event-end-date').value;
  const endTime = document.getElementById('event-end-time').value;
  // console.log(startDate);
  // console.log(startTime);

  const timeZone = document.getElementById('event-timezone').value
  let offset = 'Z';
  switch (timeZone) {
    case 'America/New_York':
      offset = '-05:00';
      break;
  }

  const eventData = {
    summary: document.getElementById('event-title').value,
    description: document.getElementById('event-description').value,
    timeZone: timeZone,
    start: startDate.concat('T').concat(startTime).concat(offset),
    end: endDate.concat('T').concat(endTime).concat(offset)
  };

  const invitationData = {
    title: document.getElementById('invitation-title').value,
    description: document.getElementById('invitation-description').value,
    users_sent_to: document.getElementById('invitation-users-sent-to').value.split(', ')
  }

  // console.log(invitationData);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eventData,
      invitationData
    })
  }

  const response = await fetch('http://localhost:5000/sendinvitation', options);
  console.log(response);
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

// need title, description, and users sent to
// users sent to must be comma separated with a space
function InvitationInput() {
  return (
    <div className='flex-vertical-container'>
      <input type='text' id='invitation-title' placeholder='Invitation Title'/>
      <input type='text' id='invitation-description' placeholder='Invitation Description' />
      <input type='text' id='invitation-users-sent-to' placeholder='Users to send invitation to' />
    </div>
  );
}

export default Evite;