import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar/Calendar';
import Evite from './pages/Evite/Evite';
import Group from './pages/Group';
import JoinGroup from './pages/join_group/JoinGroup';
import Login from './pages/LogIn';
import CalendarSelect from './pages/CalendarSelect/CalendarSelect';
import Test from './pages/Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);