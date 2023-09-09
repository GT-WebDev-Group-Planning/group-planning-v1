require('dotenv').config();

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect');


app.get('/', (req, res) => {
  res.send('<h1>Testing</h1>');
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
