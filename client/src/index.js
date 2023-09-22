import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Evite from './pages/Evite';
import Group from './pages/Group';
import JoinGroup from './pages/join_group/JoinGroup';
import Login from './pages/LogIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
        <Route path="" element={<App />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/evite" element={<Evite />} />
        <Route path="/group" element={<Group />} />
        <Route path="/joingroup" element={<JoinGroup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);