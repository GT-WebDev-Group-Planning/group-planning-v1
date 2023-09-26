import { useState } from 'react';
import './joingroup.css';
/*
  Idea: First, start where the buttons are in two halves of the screen, two contrasting colors.
  Once either is pressed, the side of the screen of the button pressed expands to the whole screen (animation, don't have to do it right now)
  Then, show the necessary inputs that the user needs to press

  On the button press, only display the respective follow-up inputs/buttons
*/

const CODE_LENGTH = 6;
const NAME_LENGTH = 15;

function JoinGroup() {
  // replace this with clickedJoin and clickedCreate
  // since we want to also show the rest of the inputs
  const [clickedCreate, setClickedCreate] = useState(false);
  const [clickedJoin, setClickedJoin] = useState(false);
  return (
    <div className="JoinGroup">
      <h1>Join Group Page</h1>
      <div className="main">
        {
          !clickedJoin && 
            <div className="create">
            {!clickedJoin && !clickedCreate && <CreateButton setClickedCreate={setClickedCreate} />}
            {clickedCreate && <CreateField />}
          </div>
        }
        {
          !clickedCreate &&
          <div className="join">
            {!clickedCreate && !clickedJoin && <JoinButton setClickedJoin={setClickedJoin} />}
            {clickedJoin && <JoinField />}
          </div>
        }
        
      </div>
    </div>
  );
}

// could merge these two functions, since the only difference is the setClicked
// and background color
function CreateButton({setClickedCreate}) {
  return (
    <button className="button mt-8" onClick={
      () => {
        setClickedCreate(true);
      }
    }>
      Create Group
    </button>
  );
}

function JoinButton({setClickedJoin}) {
  return (
    <button className="button mt-8" onClick={
      () => {
        setClickedJoin(true);
      }
    }>
      Join Group
    </button>
  );
}

// contains input field for group name, etc.
function CreateField() {
  return (
    <div className="field">
      <h2>Create Group</h2>
      <div className="inputs-col">
        <div className="input-row">
          <p className="input-text">Group Name: </p>
          <input type="text" maxLength={NAME_LENGTH}/>
        </div>
        <div className="input-row">
          <p className="input-text">Group Code: </p>
          <input maxLength={CODE_LENGTH}/>
        </div>
        <div className="input-row">
          <p className="input-text">Share: </p>
          <p>Either buttons or something else</p>
        </div>
        <button className="button self-center">
          Create Group
        </button>
      </div>
    </div>
  );
}

// contains input field for join code and join button to join the group
function JoinField() {
  // this could be replaced with a regular variable
  const [code, setCode] = useState("");
  return (
    <div className="field">
      <h2>Join Group</h2>
      <p className="input-text">Enter Group Code: </p>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. 123456" maxLength={CODE_LENGTH}/>
      <p>{code}</p>
      <button className="button">
        Join Group
      </button>
    </div>
  );
}

export default JoinGroup;