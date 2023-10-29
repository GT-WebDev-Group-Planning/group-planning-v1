const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    // ...other user information
  });
  
const User = mongoose.model('User', UserSchema);

module.exports = User;