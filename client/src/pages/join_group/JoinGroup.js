import { useState } from 'react';
import './joingroup.css';
/*
  Idea: First, start where the buttons are in two halves of the screen, two contrasting colors.
  Once either is pressed, the side of the screen of the button pressed expands to the whole screen (animation, don't have to do it right now)
  Then, show the necessary inputs that the user needs to press
*/

function JoinGroup() {
  return (
    <div className="JoinGroup">
      <h1>Join Group Page</h1>
      <div className="main">
        <p>Create Group</p>
        <p>Join Group</p>
      </div>
    </div>
  );
}

function JoinButton() {
  const [isPressed, setPressed] = useState(false);
  return (
    <button>
      
    </button>
  );
}

export default JoinGroup;