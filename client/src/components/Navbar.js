import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
        <img className="logo" src="./images/logo.webp"></img>
        <Link className="link" to="/calendar">Calendar</Link>
        <Link className="link" to="/group">Group</Link>
        <Link className="link" to="/events">Events</Link>
    </nav>
  )
}

export default Navbar