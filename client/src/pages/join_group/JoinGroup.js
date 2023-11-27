import React, { useState } from 'react'
import "./group.css"

const JoinGroup = ({ userEmail, setUserEmail }) => {
    const [code, setCode] = useState("");
    return (
      <div className="centered">
        <h2>Join Group</h2>
        <p className="input-text">Enter Group Code: </p>
        <input type="text" value={code} placeholder="e.g. 123456"/>
        <p>{code}</p>
        <button className="button">
          Join Group
        </button>
      </div>
    );
}

export default JoinGroup