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
    display: 'flex',
    position: 'absolute',
  };

  const buttonStyle = {
    fontSize: '24px',
    padding: '5px 10px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: 'lightgray', // Add your desired background color
  };

  const monthDisplay = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px',
  }

  const monthContainer = {
    display: 'flex',
    justifyContent: 'flex-end',
    verticalAlign: 'middle',
    backgroundColor: 'lightblue',
  }

  const buttonContainer = {
    display: 'flex',
    flexGrow: '0',
  }

  const leftSide = {
    display: 'flex',
    flexDirection: 'column',
    width: '250px'
  }

  const memberList = {
    height: '200px',
    overflowY: 'scroll',
  }

  const member0 = {
    backgroundColor: 'lightblue',
  }

  const member1 = {
    backgroundColor: 'lightgray',
  }

  return (
    <div className="Calendar" style={initialPos}>
      <div className='LeftSide'style={leftSide}>
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
        <div className="month-container" style={monthContainer}>
          <div id="month-display" style={monthDisplay}>{months[currentMonthIndex]}</div>
          <button id="prev-month" onClick={prevMonth} style={buttonStyle}>&lt;</button>
          <button id="next-month" onClick={nextMonth} style={buttonStyle}>&gt;</button>
        </div>
        <div style={monthDisplay}>Members:</div>
        <dl style={memberList}>
          <dt style={member0}>Coffee</dt>
          <dt style={member1}>Milk</dt>
        </dl>
      </div>
    </div>
  );
};

export default Calendar;
  