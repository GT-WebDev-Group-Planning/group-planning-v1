import React from 'react';
import { Link } from 'react-router-dom';
import "./groupcomponent.css";

const GroupComponent = ({ name, code, description }) => {
  return (
    <div className="groupComponent">
      <h3>{name}</h3>
      <h3>{code}</h3>
      <p>{description}</p>
      <button id="group-button">
        <Link to={`/group-page?code=${code}`}>Go to group page</Link>
      </button>
    </div>
  );
};

export default GroupComponent;