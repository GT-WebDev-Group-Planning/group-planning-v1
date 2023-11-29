const connectDB = require("../connect.js");
const Group = require("../models/group.js");
const User = require("../models/user.js");

require('dotenv').config();

async function getGroupEvents(req, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    // Find the group with the given code
    const group = await Group.findOne({ code: req.query.code });

    if (!group) {
      console.log("Group not found in the database.");
      return res.status(404).send("Group not found in the database.");
    }

    // Initialize an array to store results
    const result = [];

    // Iterate over group members and fetch each user's events
    for (const member of group.members) {
      const user = await User.findOne({ email: member });

      if (user) {
        result.push({
          email: user.email,
          events: user.events || [],
        });
      }
    }

    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = getGroupEvents;
