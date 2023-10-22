require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

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
const { Collection } = require('mongodb');


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

app.get('/google/redirect', (req, res) => {
  res.send("redirect works!");
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