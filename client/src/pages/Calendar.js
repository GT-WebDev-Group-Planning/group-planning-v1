import React, { useState } from 'react';

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
    position: 'absolute',
    top: '50px',
    left: '50px',
  };

  const buttonStyle = {
    fontSize: '24px',
    padding: '5px 10px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: 'lightgray', // Add your desired background color
  };

  const monthDisplay = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px',
  }

  return (
    <div className="Calendar" style={initialPos}>
      <h1 style={{ backgroundColor: 'lightblue' }}>Choose Group: </h1>
      <h2 style={{ backgroundColor: 'DodgerBlue' }}>Month: </h2>
      <div id="month-display" style={monthDisplay}>{months[currentMonthIndex]}</div>
      <button id="prev-month" onClick={prevMonth} style={buttonStyle}>&lt;</button>
      <button id="next-month" onClick={nextMonth} style={buttonStyle}>&gt;</button>
      <select name="groups" id="groupdropdown">
        <option value="Group1">Group1</option>
        <option value="Group2">Group2</option>
        <option value="Group3">Group3</option>
        <option value="Group4">Group4</option>
      </select>
    </div>
  );
};

export default Calendar;
  