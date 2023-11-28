const connectDB = require("../connect.js");
const User = require("../models/user.js");
require('dotenv').config();

async function getEvents(req, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const user = await User.findOne({ email: req.query.userEmail });
    if (!user) {
        console.log("User not found in the database.");
        return res.status(404).send("User not found in the database.");
    }

    const events = user.events || [];

    return res.status(200).json({events});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = getEvents;