import React from "react"
import CalendarListItem from "./CalendarListItem"
import './CalendarSelect.css'


/* 
 * The idea here is to grab the users calendars from Google, then allow them to 
 * select which ones they want to include in their availability.
 *
*/

let userCalendars = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'];

export default function CalendarSelectWindow() {
    return (
        <div className="CalendarSelectWindow">
            <div id="windowHeader">
                <h1 className="CalendarSelectHeader">Select Calendars to Import:</h1>
            </div>
            <div className="CalendarsList">
                {userCalendars.map((calendar) => {
                    return <CalendarListItem name={calendar}></CalendarListItem>
                })}
            </div>
            <div className="CalendarSelectWindowFooter">
                <button className="button">Import Selected Calendars</button>
            </div>
        </div>
    )
}