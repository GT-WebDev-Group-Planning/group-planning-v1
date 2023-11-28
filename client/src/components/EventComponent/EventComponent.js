import React from 'react'
import "./eventcomponent.css"

const EventComponent = ({ start, end, summary }) => {
  return (
    <div className = "eventComponent">
        <h5>{start} - {end}</h5>
        <h3>{summary}</h3>
    </div>
  )
}

export default EventComponent