const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    groups: [String],
    events: [
      {
        start: String,
        end: String,
        summary: String,
      },
    ],
    // ...other user information
  });
  
const User = mongoose.model('User', UserSchema);

module.exports = User;