const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    schema_version: Number,
    email: String,
    name: String,
    groups: [String],
    events: [String],
    invitations: [mongoose.Types.ObjectId],
    // ...other user information
  });
  
const User = mongoose.model('User', UserSchema);

module.exports = User;