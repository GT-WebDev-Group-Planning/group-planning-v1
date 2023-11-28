import React, { useState } from 'react';
import './group.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const JoinGroup = ({ userEmail, handleEmailChange }) => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddGroup = () => {
    const data = {
      code,
      userEmail,
    };
    axios
      .post('http://localhost:5000/joingroup', data)
      .then(() => {
        enqueueSnackbar('Group Joined Successfully', { variant: 'success' });
        navigate('/group');
      })
      .catch((error) => {
        enqueueSnackbar('Code does not exist', { variant: 'error' });
        console.log(error);
      });
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className="centered">
      <h2>Join Group</h2>
      <br />
      <div className="inputs-col">
        <div className="input-row">
          <p className="input-text">Group Code: </p>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="create-input"
          />
        </div>
        <button
          className="create-button"
          onClick={handleAddGroup}
          disabled={!code.trim()}
        >
          Join Group
        </button>
      </div>
    </div>
  );
};

export default JoinGroup;