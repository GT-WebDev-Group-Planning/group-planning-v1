const connectDB = require("../connect.js");
const Group = require("../models/group.js");
require('dotenv').config();

async function getGroups(req, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const groups = await Group.find({});
    return res.status(200).json({
        count: groups.length,
        data: groups
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = getGroups;