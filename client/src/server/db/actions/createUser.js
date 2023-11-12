const connectDB = require("../connect.js");
const User = require("../models/user.js");
require('dotenv').config();

async function createUser(userData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { email, name } = userData;
    if (await User.exists({ email: email })) {
      return true;
    }
    const groups = [];
    const events = [];
    const user = new User({ email, name, events, groups });
    await user.save();
    return false;
  } catch (e) {
    return res.status(400).send("Unable to create a user. Invalid data");
  }
}

module.exports = createUser;