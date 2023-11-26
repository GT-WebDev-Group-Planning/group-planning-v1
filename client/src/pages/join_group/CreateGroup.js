import React, { useState } from 'react'
import "./group.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveGroup = () => {
        const data = {
            name,
            code,
            description
        };
        setLoading(true);
        axios.post('http://localhost:5000/group', data)
        .then (() => {
            setLoading(false);
            navigate('/group');
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    };

    return (
        <div className="field">
          <h2>Create Group</h2>
          <div className="inputs-col">
            <div className="input-row">
              <p className="input-text">Name: </p>
              <input
                type = "text"
                value = { name }
                onChange = {(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-row">
              <p className="input-text">Group Code: </p>
              <input type="text"
                value = { code }
                onChange = {(e) => setCode(e.target.value)}
              />
            </div>
            <div className="input-row">
              <p className="input-text">Description: </p>
              <textarea 
                value = { description }
                onChange = {(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="button self-center"
            onClick={handleSaveGroup}>
              Create Group
            </button>
          </div>
        </div>
      );
}

export default CreateGroup