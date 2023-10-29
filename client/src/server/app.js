const createUser = require("./db/actions/createUser");

const axios = require("axios")

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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


app.get('/', (req, res) => {
  res.send('<h1>Testing</h1>');
})

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  })

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

    return await createUser(data, res)
  } catch (error) {
    console.log(error)
    return res.status(500).send("Unable to save user")
  }
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
