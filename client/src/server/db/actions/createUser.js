const connectDB = require("../connect.js");
const User = require("../models/user.js");

async function createUser(userData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const { email, name } = userData;
    const user = new User({ email, name });
    await user.save();
    return res.status(200).send("Successfully created a user");
  } catch (e) {
    return res.status(400).send("Unable to create a user. Invalid data");
  }
}

module.exports = createUser;