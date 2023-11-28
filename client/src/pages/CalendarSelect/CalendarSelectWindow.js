// CalendarSelectWindow.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CalendarListItem from './CalendarListItem';
import './CalendarSelect.css';

export default function CalendarSelectWindow() {
  const location = useLocation();
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const calendarsParam = searchParams.get('calendars');

    if (calendarsParam) {
      try {
        const parsedCalendars = JSON.parse(calendarsParam);
        setCalendars(parsedCalendars);
      } catch (error) {
        console.error('Error parsing calendar data:', error);
      }
    }
  }, [location.search]);

  return (
    <div className="CalendarSelectWindow">
      <div id="windowHeader">
        <h1 className="CalendarSelectHeader">Select Calendars to Import:</h1>
      </div>
      <div className="CalendarsList">
      {calendars.map((calendar) => {
        console.log('Calendar ID:', calendar.id);
        return <CalendarListItem calendarId={calendar.id} name={calendar.summary} />;
      })}
      </div>
    </div>
  );
}