function CalendarSelect() {
    return (
      <div className="CalendarSelect">
        <div className="navBar">
          <h1>Calendar Select Page</h1>
        </div>
        <div className="mainSection">
          <Main/>
        </div>
      </div>
    );
  }

  function SelectionPane() {
    return (
      <div className="options">
          <div className="selAndHelp">
            <SelectAndHelp/>
          </div>
          <div className="calLabels">
            <label>
              <input type="checkbox" />
              <span>Calendar 1</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 2</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 3</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 4</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 5</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 6</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 7</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 8</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 9</span>
            </label><br></br>
            <label>
              <input type="checkbox" />
              <span>Calendar 10</span>
            </label><br></br>
          </div>
          <div className="confirmBtn">
            <button className="CSbutton">Confirm</button> 
          </div>
        </div>
    )
  }

  function SelectAndHelp() {
    return (
      <div className="SelectAndHelp">
        <div className="selCalendar">
          <p className="p1">Select Calendars:</p>
        </div>
        <div className="btn">
          <button className="b1">HELP</button>
        </div>
      </div>
    )
  }

  function Main() {
    return (
      <div className="Container"> 
        <div className="leftPane">
        </div>
        <div className="midPane">
          <SelectionPane/>
        </div>
        <div className="rightPane">
        </div>
      </div>
    )
  }
  
  export default CalendarSelect;
  