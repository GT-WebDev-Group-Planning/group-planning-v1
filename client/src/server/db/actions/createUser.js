const connectDB = require("../connect.js");
const User = require("../models/user.js");
require('dotenv').config();

async function createUser(userData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { email, name } = userData;
    if (await User.exists({ email: email })) {
      const user = await User.findOne({ email: email });
      // updatee user to latest schema if not latest
      if (user.schema_version === undefined || user.schema_version === null || user.schema_version < 2) {
        user.schema_version = 2;
        user.invitations = []
        await user.save();
      }
      return true;
    }
    const groups = [];
    const events = [];
    const invitations = [];
    const user = new User({ email, name, events, groups, invitations });
    await user.save();
    return false;
  } catch (e) {
    return res.status(400).send("Unable to create a user. Invalid data");
  }
}

module.exports = createUser;