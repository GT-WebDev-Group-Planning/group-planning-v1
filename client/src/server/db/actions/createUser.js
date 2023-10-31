const connectDB = require("../connect.js");
const User = require("../models/user.js");

async function createUser(userData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { e, n } = userData;
    if (User.exists({ email : e })) {
      return true;
    }
    const groups = [];
    const events = [];
    const user = new User({ e, n, events, groups });
    await user.save();
    return false;
  } catch (e) {
    return res.status(400).send("Unable to create a user. Invalid data");
  }
}

module.exports = createUser;