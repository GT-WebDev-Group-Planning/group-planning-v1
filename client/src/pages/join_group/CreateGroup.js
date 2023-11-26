import React from 'react'
import "./group.css"

const CreateGroup = () => {
    return (
        <div className="field">
          <h2>Create Group</h2>
          <div className="inputs-col">
            <div className="input-row">
              <p className="input-text">Group Name: </p>
              <input type="text"/>
            </div>
            <div className="input-row">
              <p className="input-text">Group Code: </p>
              <input/>
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

export default CreateGroup