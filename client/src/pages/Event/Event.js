import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import EventComponent from '../../components/EventComponent/EventComponent'
import axios from 'axios';

const Event = ({ userEmail, setUserEmail }) => {
  console.log(userEmail);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getEvents', {
          params: {
            userEmail: userEmail,
          },
        });
        setEvents(response.data); // Assuming the API response is an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
        <Navbar />
        {events.map((event, index) => (
          <EventComponent
            key={index}
            start={event.start}
            end={event.end}
            summary={event.summary}
          />
        ))}
        {/* <EventComponent name="Studying" date = "November 11, 2023" time = "1:00 - 2:00" description="2200 exam coming up!"/>
        <EventComponent name="GT WebDev Club" date = "November 11, 2023" time = "1:00 - 2:00" description="Showcase at Bogg B9 and there will be free pizza and a lot of web application demos"/>
        <EventComponent name="Studying" date = "November 11, 2023" time = "1:00 - 2:00" description="2200 exam coming up!"/>
        <EventComponent name="GT WebDev Club" date = "November 11, 2023" time = "1:00 - 2:00" description="Showcase at Bogg B9 and there will be free pizza and a lot of web application demos"/>
        <EventComponent name="Studying" date = "November 11, 2023" time = "1:00 - 2:00" description="2200 exam coming up!"/>
        <EventComponent name="GT WebDev Club" date = "November 11, 2023" time = "1:00 - 2:00" description="Showcase at Bogg B9 and there will be free pizza and a lot of web application demos"/>
        <EventComponent name="Studying" date = "November 11, 2023" time = "1:00 - 2:00" description="2200 exam coming up!"/>
        <EventComponent name="GT WebDev Club" date = "November 11, 2023" time = "1:00 - 2:00" description="Showcase at Bogg B9 and there will be free pizza and a lot of web application demos"/>
        <EventComponent name="Studying" date = "November 11, 2023" time = "1:00 - 2:00" description="2200 exam coming up!"/>
        <EventComponent name="GT WebDev Club" date = "November 11, 2023" time = "1:00 - 2:00" description="Showcase at Bogg B9 and there will be free pizza and a lot of web application demos"/> */}
    </div>
  )
}

export default Event