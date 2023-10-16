import { Link } from "react-router-dom";

function App() {
    return (
      <div className="App">
        <h1>Group Planning</h1>
        <button><Link to="/calendar">Calendar</Link></button>
        <button><Link to="/evite">Evite</Link></button>
        <button><Link to="/group">Group</Link></button>
        <button><Link to="/joingroup">Join Group</Link></button>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/test">Test</Link></button>
      </div>
    );
  }
  
  export default App;
  