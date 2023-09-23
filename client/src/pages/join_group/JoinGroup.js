import { useState } from 'react';
import './joingroup.css';
/*
  Idea: First, start where the buttons are in two halves of the screen, two contrasting colors.
  Once either is pressed, the side of the screen of the button pressed expands to the whole screen (animation, don't have to do it right now)
  Then, show the necessary inputs that the user needs to press

  On the button press, only display the respective follow-up inputs/buttons
*/

function JoinGroup() {
  // replace this with clickedJoin and clickedCreate
  // since we want to also show the rest of the inputs
  const [showCreate, setShowCreate] = useState(true);
  const [showJoin, setShowJoin] = useState(true);
  return (
    <div className="JoinGroup">
      <h1>Join Group Page</h1>
      <div className="main">
        {showCreate && <CreateButton setShowJoin={setShowJoin} />}
        {showJoin && <JoinButton setShowCreate={setShowCreate} />}
      </div>
    </div>
  );
}

function CreateButton({setShowJoin}) {
  return (
    <button onClick={
      () => {
        setShowJoin(false);
      }
    }>
      Create Group
    </button>
  );
}

function JoinButton({setShowCreate}) {
  return (
    <button onClick={
      () => {
        setShowCreate(false);
      }
    }>
      Join Group
    </button>
  );
}

export default JoinGroup;