import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Group() {
  const location = useLocation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const eventsParam = searchParams.get("events");

    if (eventsParam) {
      try {
        const decodedEventsParam = decodeURIComponent(eventsParam);
        const parsedEvents = JSON.parse(decodedEventsParam);
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error parsing events data:", error);
      }
    }
  }, [location.search]);

  return (
    <div className="Group">
      <Navbar />
      <h1>Group Page</h1>
      <h2>Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.start && event.start.dateTime} - {event.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Group;
