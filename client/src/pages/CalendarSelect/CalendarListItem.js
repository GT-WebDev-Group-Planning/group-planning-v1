// CalendarListItem.js
import React from 'react';

function CalendarListItem({ calendarId, name }) {
    const calendarLink = `http://localhost:5000/events?calendar=${encodeURIComponent(calendarId)}`;
  
    return (
      <div className="CalendarListItem">
        {name}
        <a href={calendarLink}>    Choose</a>
      </div>
    );
  }  

export default CalendarListItem;