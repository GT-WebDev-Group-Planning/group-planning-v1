import React from 'react'
import "./eventcomponent.css"

const EventComponent = ({ start, end, summary }) => {
  return (
    <div className = "eventComponent">
        <h3>{summary}</h3>
        <h5>{start}  {end}</h5>
    </div>
  )
}

export default EventComponent