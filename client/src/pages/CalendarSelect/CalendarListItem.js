import React from "react"

export default function CalendarListItem(props) {
    return (
        <div className="CalendarListItem">
            <input type="checkbox" name={props.name} />
            <label for={props.name}>{props.name}</label>
        </div>
    )
}