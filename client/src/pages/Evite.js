import invitation from './invitation_picture.png';
import friends from './friends.png'
import { Link } from "react-router-dom";
function Evite() {
    return (
      <div className="Evite">
        <center><h1 color="#f4a1e9">Invitation</h1>
        <br /><br /><br />
        <input type="text"></input>
        <button type = "submit" color="Red">Send Invitation</button>
        <h2>Attendees</h2></center>
        <img src={invitation} alt="Invitation" width="300" height="250" />
        <img src={friends} alt="Mike and Sully" width="260" height="330" align="right" />
        <br />
        <center><button type="button" align="Bottom"><Link to="/calendar">Back</Link></button></center>
      </div>
    );
  }
  
  export default Evite;
  