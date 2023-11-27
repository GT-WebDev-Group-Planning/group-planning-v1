import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar/Calendar';
import Evite from './pages/Evite/Evite';
import Group from './pages/Group/Group';
import JoinGroup from './pages/join_group/JoinGroup';
import Login from './pages/LogIn';
import CalendarSelect from './pages/CalendarSelect/CalendarSelect';
import Event from './pages/Event/Event';
import Test from './pages/Test';
import CreateGroup from './pages/join_group/CreateGroup';
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react';

function App() {
  const [userEmail, setUserEmail] = useState("user@example.com");
  const handleEmailChange = (newEmail) => {
    setUserEmail(newEmail);
  };
    return (
    <SnackbarProvider>
    <Router>
      <Routes>
        <Route path="" element={<Test userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/calendar" element={<Calendar userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/evite" element={<Evite userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/group" element={<Group userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/joingroup" element={<JoinGroup userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/creategroup" element={<CreateGroup userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/login" element={<Login userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/calendarselect" element={<CalendarSelect userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/events" element={<Event userEmail={userEmail} setUserEmail={setUserEmail} />} />
        <Route path="/test" element={<Test userEmail={userEmail} setUserEmail={setUserEmail} />} />
      </Routes>
    </Router>
    </SnackbarProvider>
    );
  }
  
  export default App;
  