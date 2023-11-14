const createUser = require("./db/actions/createUser");
const updateEvents = require("./db/actions/updateEvents");

const axios = require("axios")

const cookieParser = require('cookie-parser');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const { google } = require('googleapis');

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
// const { Collection } = require('mongodb');

// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

/**
 * Load or request or authorization to call APIs.
 *
 */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: scopes,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} id The calendar ID.
 */
async function listEvents(auth, id) {
  const calendar = google.calendar({ version: 'v3', auth });
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
    console.log(`${start} - ${event.summary}`);
  });
  return events; // Return the events array
}

app.get('/events', async (req, res) => {
  try {
    const events = await listEvents(oauth2Client, req.query.calendar);
    const eventsJSON = JSON.stringify(events);
    const eventsParam = encodeURIComponent(eventsJSON);
    const userEmail = req.cookies.userEmail;
    const updated = await updateEvents(userEmail, events);
    if (updated) {
      res.redirect(`http://localhost:3000/group?events=${eventsParam}`);
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

start();