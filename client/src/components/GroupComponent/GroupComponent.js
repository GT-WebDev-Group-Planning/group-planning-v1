import React from 'react'
import "./groupcomponent.css"

const GroupComponent = ({ name, code, description }) => {
  return (
    <div className = "groupComponent">
        <h3>{name}</h3>
        <h3>{code}</h3>
        {/* <p><strong>date</strong> upcoming event title</p> */}
        <p>{description}</p>
    </div>
  )
}

export default GroupComponent