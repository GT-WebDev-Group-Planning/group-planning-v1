import React, { useState } from 'react';
import './calendar.css';

const Calendar = () => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const prevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  const initialPos = {
    display: 'flex',
    position: 'absolute',
  };

  const memberList = {
    height: '100px',
    overflowY: 'scroll',
  }

  return (
    <div className="Calendar" style={initialPos}>
      <div className='LeftSide'>
        {/*Choose Group Section*/}
        <h1 style={{ backgroundColor: 'lightblue' }}>Choose Group: </h1>
        <select name="groups" id="groupdropdown">
          <option value="Group1">Group1</option>
          <option value="Group2">Group2</option>
          <option value="Group3">Group3</option>
          <option value="Group4">Group4</option>
        </select>
        {/*Month Section*/}
        <h2 style={{ backgroundColor: 'DodgerBlue' }}>Month: </h2>

        <div className="month-container">
          <div id="month-display">{months[currentMonthIndex]}</div>
          <button id="prev-month" onClick={prevMonth}>&lt;</button>
          <button id="next-month" onClick={nextMonth}>&gt;</button>
        </div>

        <div id='calendarPH'></div>
        <h2>Members:</h2>
        <dl style={memberList}>
          <dt class='member0'>Get member based on group</dt>
          <dt class='member1'>Get member based on group</dt>
          <dt class='member0'>Get member based on group</dt>
          <dt class='member1'>Get member based on group</dt>
          <dt class='member0'>Get member based on group</dt>
          <dt class='member1'>Get member based on group</dt>
        </dl>
      </div>
      <iframe class = "gcal" src="https://calendar.google.com/calendar/embed?src=kieranmarland%40gmail.com&ctz=America%2FNew_York" style={{ width: '800px', height: '600px', border: '0px'}}></iframe>
    </div>
  );
};

export default Calendar;
  