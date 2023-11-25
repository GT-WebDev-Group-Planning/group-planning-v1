import { Link } from "react-router-dom";

function App() {
    return (
      <div className="App">
        <h1>Group Planning</h1>
        <button><Link to="/calendar">Calendar</Link></button>
        <button><Link to="/evite">Create Event</Link></button>
        <button><Link to="/group">Group</Link></button>
        <button><Link to="/joingroup">Join Group</Link></button>
        {/* <button><Link to="/login">Login</Link></button> */}
        <button><Link to="/CalendarSelect">Calendar Select</Link></button>
        <button><Link to="/test">Login</Link></button>
      </div>
    );
  }
  
  export default App;
  