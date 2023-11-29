const connectDB = require("../connect.js");
const Group = require("../models/group.js");
require('dotenv').config();

async function joinGroup(groupData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { code, userEmail } = groupData;

    // Check if a group with the given code already exists
    const existingGroup = await Group.findOne({ code : code });

    if (existingGroup) {
      const memberExists = existingGroup.members.some(member => member === userEmail);

      // If the userEmail doesn't exist, add it to the members array
      if (!memberExists) {
        existingGroup.members.push(userEmail);
        await existingGroup.save();
        return true;
      }

      // If the userEmail already exists, return false
      return false;
    }
    return false;
  } catch (error) {
    console.error('Error joining group:', error);
    return false;
  }
}

module.exports = joinGroup;
