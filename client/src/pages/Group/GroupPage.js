import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './group.css';
import axios from 'axios';
import EventComponent from '../../components/EventComponent/EventComponent';

function GroupPage() {
  const [code, setCode] = useState(123);
  const [events, setEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const codeParam = searchParams.get('code');

    if (codeParam) {
      try {
        const parsedCode = JSON.parse(codeParam);
        setCode(parsedCode)
      } catch (error) {
        console.error('Error parsing code data:', error);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getGroupEvents', {
          params: {
            code: code,
          },
        });
        setEvents(response.data.result); // Assuming the API response is an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="Group">
      <Navbar />
      <div className="gridContainer">
        {events.map((eventGroup, index) => (
          <div key={index}>
            <p>Email: {eventGroup.email}</p>
            {eventGroup.events.map((event, innerIndex) => (
              <EventComponent
                key={innerIndex}
                start={event.start}
                end={event.end}
                summary={event.summary}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupPage;