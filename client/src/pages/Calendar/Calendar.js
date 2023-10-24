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

  {/*Custom Select Component*/}
  function SelectComponent() {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
    };
  
    return (
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
        {selectedOption === '' ? (
          <option value="" disabled>Group Name</option>
        ) : null}
          <option value="Group 1">Group 1</option>
          <option value="Group 2">Group 2</option>
          <option value="Group 3">Group 3</option>
        </select>
        {selectedOption && <p>{selectedOption} Events Listed Here</p>}
      </div>
    );
  }

  const memberList = {
    height: '100px',
    overflowY: 'scroll',
  }

  return (
    <div className="Calendar" >
      <div className="NavBar">
      </div>
      <div className='LeftSide'>
        <div className="circles">
          <div class="circle1"></div>
          <h3>You</h3>
          <div class="circle2"></div>
          <h3>Group</h3>
          <div class="circle3"></div>
          <h3>Members</h3>
        </div>
        {/*Choose Group Section*/}
        <SelectComponent></SelectComponent>
        {/* Month Section
        <div className="month-container">
          <div id="month-display">{months[currentMonthIndex]}</div>
          <button id="prev-month" onClick={prevMonth}>&lt;</button>
          <button id="next-month" onClick={nextMonth}>&gt;</button>
        </div>
        */}
        <h2>Members:</h2>
        <dl style={memberList}>
          <dt class='member0'>Get member based on group</dt>
          <dt class='member1'>Get member based on group</dt>
          <dt class='member0'>Get member based on group</dt>
          <dt class='member1'>Get member based on group</dt>
          <dt class='member0'>Get member based on group</dt>
          <dt class='member1'>Get member based on group</dt>
        </dl>
        <button> Create Event </button>
      </div>
      <iframe class = "gcal" src="https://calendar.google.com/calendar/embed?src=kieranmarland%40gmail.com&ctz=America%2FNew_York" style={{ width: '1000px', height: '600px', border: '0px'}}></iframe>
    </div>
  );
};

export default Calendar;
  