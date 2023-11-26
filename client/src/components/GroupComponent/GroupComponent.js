import React from 'react'
import "./groupcomponent.css"

const GroupComponent = ({ name, description }) => {
  return (
    <div className = "groupComponent">
        <h3>{name}</h3>
        <p><strong>date</strong> upcoming event tile</p>
        <p>{description}</p>
    </div>
  )
}

export default GroupComponent