const connectDB = require('../connect');
const User = require('../models/user');
require('dotenv').config();

async function getUser(email) {
    await connectDB(process.env.MONGO_URI);
    const user = await User.findOne({ email: email });
    return user;
}

module.exports = getUser;