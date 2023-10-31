const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    groups: [String],
    events: [String]
    // ...other user information
  });
  
const User = mongoose.model('User', UserSchema);

module.exports = User;