const connectDB = require("../connect.js");
const Group = require("../models/group.js");
require('dotenv').config();

async function createGroup(groupData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { code, name, description, userEmail } = groupData;
    const members = [];
    members.push(userEmail);
    const group = new Group({ code, name, description, members });
    await group.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = createGroup;