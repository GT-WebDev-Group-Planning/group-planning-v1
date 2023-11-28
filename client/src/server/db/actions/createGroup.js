const connectDB = require("../connect.js");
const Group = require("../models/group.js");
require('dotenv').config();

async function createGroup(groupData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { code, name, description } = groupData;
    const members = [];
    const events = [];
    const group = new Group({ code, name, description, members, events });
    await group.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = createGroup;