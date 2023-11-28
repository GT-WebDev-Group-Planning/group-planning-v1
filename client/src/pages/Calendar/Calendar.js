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


    const [showMembers, setShowMembers] = useState(false);
 
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
      setShowMembers(true);
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


        {/* Render when selectedOption has a value */}
        {selectedOption && (
        <div className="members-section">
          <p>{selectedOption} Events Listed Here</p>
          <div className="members-container">
            <h2>Members:</h2>
            <dl style={memberList}>
              <dt className='member0'>Get member based on group</dt>
              <dt className='member1'>Get member based on group</dt>
              <dt className='member0'>Get member based on group</dt>
              <dt className='member1'>Get member based on group</dt>
              <dt className='member0'>Get member based on group</dt>
              <dt className='member1'>Get member based on group</dt>
            </dl>
          </div>
        </div>
      )}
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
       
        <button> Create Event </button>
      </div>
      <iframe class = "gcal" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23fffdf7&ctz=America%2FNew_York&mode=WEEK&showPrint=0&showTabs=1&src=a2llcmFubWFybGFuZEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" style={{ width: '1400px', height: '800px', border: '0px'}}></iframe>
    </div>
  );
};


export default Calendar;
 

