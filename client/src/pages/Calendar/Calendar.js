import React, { useState, useEffect } from 'react';
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

    const [shouldAnimate, setShouldAnimate] = useState(false);

    let groupContent;

    switch (selectedOption) {
      case 'Group 1':
        groupContent = (
          <div className={`members-section ${selectedOption ? 'open' : ''}`}>
            <div className='members-container'>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23fffdf7&ctz=America%2FNew_York&showTitle=0&mode=MONTH&showPrint=0&src=a2llcmFubWFybGFuZEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"style={{ width: '400px', height: '300px', border: '0px'}}></iframe>
              <h2><u>Today:</u></h2>
              <p>All Clear!</p>
            </div>
          </div>
        );
        break;
      case 'Group 2':
        groupContent = (
          <div className={`members-section ${selectedOption ? 'open' : ''}`}>
            <div className='members-container'>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23fffdf7&ctz=America%2FNew_York&showTitle=0&mode=MONTH&showPrint=0&src=a2llcmFubWFybGFuZEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%23D50000" style={{ width: '400px', height: '300px', border: '0px'}}></iframe>
            <h2><u>Today:</u></h2>
              <p>All Clear!</p>
            <h2><u>24 Dec:</u></h2>
              <div class='event'>
                <div class="circle-container">
                  <div class="circle"></div>
                  <div class="circle"></div>
                  <div class="circle"></div>
                  <div class="circle4"></div>
                </div>
                <div>
                  <h3>
                    Christmas Eve Party
                  </h3>
                  <h3>
                    6:00 PM
                  </h3>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'Group 3':
        groupContent = (
          <div className={`members-section ${selectedOption ? 'open' : ''}`}>
            <div className='members-container'>
            <iframe  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23fffdf7&ctz=America%2FNew_York&showTitle=0&mode=MONTH&showPrint=0&src=a2llcmFubWFybGFuZEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%238E24AA" style={{ width: '400px', height: '300px', border: '0px'}}></iframe>
            <h2><u>Today:</u></h2>
              <p>All Clear!</p>
            <h2><u>3 Dec:</u></h2>
              <div class='event'>
                <div class="circle-container">
                  <div class="circle"></div>
                  <div class="circle"></div>
                  <div class="circle4"></div>
                </div>
                <div>
                  <h3>
                    Basketball Game
                  </h3>
                  <h3>
                    7:30 PM
                  </h3>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      default:
        groupContent = null;
    }
 
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);

      setShouldAnimate(true);
    };

    const animationClass = shouldAnimate ? 'close-animation' : '';

    useEffect(() => {
      const container = document.querySelector('.members-section');
      if (container) {
        container.classList.remove('open');
        setTimeout(() => {
          container.classList.add('open');
        }, 400);
      }
    }, [selectedOption]);
 
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
        <div className={animationClass}>
          {groupContent}
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
      <iframe class = "gcal" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23fffdf7&ctz=America%2FNew_York&showTitle=0&mode=WEEK&showPrint=0&src=a2llcmFubWFybGFuZEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" style={{ width: '1400px', height: '800px', border: '0px'}}></iframe>
    </div>
  );
};


export default Calendar;
 

