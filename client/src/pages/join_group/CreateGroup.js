import React, { useState } from 'react'
import "./group.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack'

const CreateGroup = ({ userEmail, handleEmailChange }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveGroup = () => {
        const data = {
            name,
            code,
            description
        };
        setLoading(true);
        axios.post('http://localhost:5000/group', data)
        .then (() => {
            enqueueSnackbar('Group Created Successfully', {variant: 'success'});
            navigate('/group');
        })
        .catch((error) => {
            enqueueSnackbar('Code Already in Use', {variant: 'error'});
            console.log(error);
        });
    };

    return (
        <div className="centered">
          <h2>Create Group</h2>
          <br />
          <div className="inputs-col">
            <div className="input-row">
              <p className="input-text">Name: </p>
              <input
                type = "text"
                value = { name }
                onChange = {(e) => setName(e.target.value)}
                className = "create-input"
              />
            </div>
            <div className="input-row">
              <p className="input-text">Group Code: </p>
              <input type="text"
                value = { code }
                onChange = {(e) => setCode(e.target.value)}
                className = "create-input"
              />
            </div>
            <div className="input-row">
              <p className="input-text">Description: </p>
              <textarea 
                value = { description }
                onChange = {(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="create-button"
            onClick={handleSaveGroup}>
              Create Group
            </button>
          </div>
        </div>
      );
}

export default CreateGroup