const createUser = require("./db/actions/createUser");
const createInvitation = require('./db/actions/createInvitation');
const createEvent = require('./db/actions/createEvent');
const getInvitation = require('./db/actions/getInvitation');
const getUser = require('./db/actions/getUser');
const createGroup = require("./db/actions/createGroup");
const joinGroup = require("./db/actions/joinGroup");
const updateEvents = require("./db/actions/updateEvents");
const getGroups = require("./db/actions/getGroups");
const getEvents = require("./db/actions/getEvents");
const getGroupEvents = require("./db/actions/getGroupEvents");
require('dotenv').config();

const axios = require("axios")

const cookieParser = require('cookie-parser');

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
)

const calendar = google.calendar({
  version : "v3",
  auth : process.env.GOOGLE_CALENDAR_API
})

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/calendar'
];

//connectDB
const connectDB = require('./db/connect');
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const { Console } = require("console");

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} id The calendar ID.
 */
async function listEvents(auth, id, userEmail) {
  const calendar = google.calendar({ version: 'v3', auth });
  if (userEmail === id) {
    id = "primary";
  }
  const res = await calendar.events.list({
    calendarId: id,
    timeMin: new Date().toISOString(),
    maxResults: 20,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return [];
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
  });
  return events; // Return the events array
}

app.get('/events', async (req, res) => {
  try {
    const userEmail = req.cookies.userEmail;
    const events = await listEvents(oauth2Client, req.query.calendar, userEmail);
    const updated = await updateEvents(userEmail, events);
    if (updated) {
      res.redirect(`http://localhost:3000/group?email=${JSON.stringify(userEmail)}`);
    }
    else {
      res.redirect(`http://localhost:3000`);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

/**
 * Lists the user's calendars with their IDs and summaries.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listCalendars(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const calendarList = await calendar.calendarList.list();
  const calendars = calendarList.data.items;

  if (!calendars || calendars.length === 0) {
    console.log('No calendars found.');
    return [];
  }

  const calendarData = calendars.map((calendar) => ({
    id: calendar.id,
    summary: calendar.summary,
  }));

  return calendarData; // Return the list of calendars with IDs and summaries
}

app.get('/getEvents', async (req, res) => {
  return getEvents(req, res);
});

app.get('/getGroupEvents', async (req, res) => {
  return getGroupEvents(req, res);
});

app.get('/', (req, res) => {
  res.send('<h1>Testing</h1>');
});

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  });

  res.redirect(url);
});

app.post('/creategroup', async (req, res) => {
  const groupData = req.body;
  const created = await createGroup(groupData, res);
  if (created) {
    res.status(200).send("Group created successfully");
  } else {
    res.status(500).send("Unable to create group");
  }
});

app.post('/joingroup', async (req, res) => {
  const groupData = req.body;
  const joined = await joinGroup(groupData, res);
  if (joined) {
    res.status(200).send("Group joined successfully");
  } else {
    res.status(500).send("Unable to join group");
  }
});

app.get('/group', async (request, response) => {
  return getGroups(request, response);
});

app.get('/redirect', async (req, res) => {
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Use the access token to fetch user information
    const googleOauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });

    const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`);

    const exists = await createUser(data, res);
    if (exists.statusCode === 400) return exists;

    if (!exists || exists) {
      // Fetch the list of calendars
      const calendars = await listCalendars(oauth2Client);
      // Send the calendar data and events data to the CalendarSelect URL
      res.cookie('userEmail', data.email).redirect(`http://localhost:3000/CalendarSelect?calendars=${JSON.stringify(calendars)}`);
    } else {
      // Handle other cases or errors
      res.status(500).send("Unable to save user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to save user");
  }
});



app.get('/events', (req, res) => {
  listEvents(oauth2Client)
  res.send('<h1>Events</h1>');
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// creates calendar for user(s)
app.post('/createcalendar', (req, res) => {
  /*
    request body format: 
  */
});

// creates and sends an invitation to user(s)
// req body must include invitation data as an object in the form of 
/*
invitation = {
  title,
  description,
  users_sent_to
}
*/
// and event data as an object in the form of
/*
event = {
  start, 
  end, 
  timeZone, 
  summary, 
  description
}
*/
app.post('/sendinvitation', async (req, res) => {
  // retrieve invite and event data
  const { eventData, invitationData } = req.body;
  invitationData.eventData = eventData;
  const invitation = await createInvitation(invitationData, res);

  // add invitation to all users the invite was sent to
  for (email of invitationData.users_sent_to) {
    const person = await getUser(email);
    person.invitations.push(invitation._id);
    await person.save();
  }

  res.status(200).send('OK');
});

// accept invitation and add event of invitation
app.post('/acceptinvitation/:invitationId', async (req, res) => {
  const invitationId = req.params.invitationId;
  // get invitation from database
  const invitation = await getInvitation(invitationId);

  // get user info (email)
  const token = await oauth2Client.getAccessToken();

  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token.token}`);
  const user = data.email;

  // check if user email is part of users invited (sent to) or accepted just in case
  if (invitation.users_accepted.includes(user)) return res.status(200).send("User already accepted invitation");
  if (!invitation.users_sent_to.includes(user)) return res.status(400).send("User was not invited"); 

  // update accepted users on invitation
  invitation.users_accepted.push(user);
  await invitation.save();
  // add the event to the user calendar
  const invitationEvent = invitation.event.toObject();
  const event = {
    "kind": "calender#event",
    "summary": invitationEvent.summary,
    "description": invitationEvent.description,
    "start": {
      'dateTime': invitationEvent.start,
      'timeZone': invitationEvent.timeZone,
    },
    "end": {
      'dateTime': invitationEvent.end,
      'timeZone': invitationEvent.timeZone,
    }
  };
  await addEvent(event);
  res.send("Hello");
});

async function addEvent(eventData) {
  await calendar.events.insert({
    calendarId: 'primary',
    resource: eventData,
    auth: oauth2Client
  });
}

// returns all invitations of a user
// returns a json of the form
/*
{
  invitations: [invitation1, invitation2, ...]
}
*/
// each invitation will have all of its data as defined by the Invitation model
app.get('/getinvitations', async (req, res) => {
  // get user info (email)
  const token = await oauth2Client.getAccessToken();

  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token.token}`);
  const user = await getUser(data.email);

  const invitations = [];
  for (invitationId of user.invitations) {
    const invitation = await getInvitation(invitationId);
    // remove unneccessary information
    const { _id, schema_version, users_sent_to, users_accepted, __v, ...invitationObj } = invitation.toObject();
    invitations.push(invitationObj);
  }

  res.json({ "invitations": invitations });
});

start();
