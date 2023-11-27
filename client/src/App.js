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

function App() {
    return (
    <SnackbarProvider>
    <Router>
      <Routes>
        <Route path="" element={<Test />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/evite" element={<Evite />} />
        <Route path="/group" element={<Group />} />
        <Route path="/joingroup" element={<JoinGroup />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendarselect" element={<CalendarSelect />} />
        <Route path="/events" element={<Event />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
    </SnackbarProvider>
    );
  }
  
  export default App;
  