import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import GroupComponent from '../../components/GroupComponent/GroupComponent';
import './group.css';
import axios from 'axios';

function Group({ userEmail, handleEmailChange }) {
  const location = useLocation();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');

    if (emailParam) {
      try {
        const parsedEmail = JSON.parse(emailParam);
        handleEmailChange(parsedEmail);
      } catch (error) {
        console.error('Error parsing email data:', error);
      }
    }
  }, [location.search]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/group')
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Group">
      <Navbar />
      <div className="top">
        <input type="text" placeholder="Search Groups"></input>
        <div>
          <button className="group-buttons">
            <Link to="/joingroup">Join</Link>
          </button>
          <button className="group-buttons">
            <Link to="/creategroup">Create</Link>
          </button>
        </div>
      </div>
      <div className="gridContainer">
        {groups
          .filter((group) => group.members.some((member) => member === userEmail))
          .map((group) => (
            <GroupComponent
              name={group.name}
              code={group.code}
              description={group.description}
            />
          ))}
      </div>
    </div>
  );
}

export default Group;