const createUser = require("./db/actions/createUser");
const createGroup = require("./db/actions/createGroup");
const updateEvents = require("./db/actions/updateEvents");
const getGroups = require("./db/actions/getGroups");
const getEvents = require("./db/actions/getEvents");
require('dotenv').config();

const jwt = require('jsonwebtoken');

const axios = require("axios")

const cookieParser = require('cookie-parser');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1 hour
}));

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
    maxResults: 10,
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
    const eventsJSON = JSON.stringify(events);
    const eventsParam = encodeURIComponent(eventsJSON);
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

app.post('/group', async (req, res) => {
  const groupData = req.body;
  const created = await createGroup(groupData, res);
  if (created) {
    res.status(200).send("Group created successfully");
  } else {
    res.status(500).send("Unable to create group");
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
      const jwt = require('jsonwebtoken');

      const generateToken = (userEmail) => {
        const token = jwt.sign({ email: userEmail }, 'your-secret-key', { expiresIn: '1h' });
        return token;
      };
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

start();