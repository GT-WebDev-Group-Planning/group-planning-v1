import React from 'react'
import "./eventcomponent.css"

const EventComponent = ({ name, date, time, description }) => {
  return (
    <div className = "eventComponent">
        <h3>{name}</h3>
        <h5>{date}  {time}</h5>
        <p>{description}</p>
    </div>
  )
}

export default EventComponent