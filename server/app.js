require('dotenv').config();

const express = require('express');
const app = express();

const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
)

const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

//connectDB
const connectDB = require('./db/connect');


app.get('/', (req, res) => {
  res.send('<h1>Testing</h1>');
})

app.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  })

  res.redirect(url);
});

app.get('/google/redirect', (req, res) => {
  res.send("redirect works!");
})

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
