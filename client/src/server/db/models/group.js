const mongoose = require('mongoose');
const { Schema } = mongoose;

// id already created: _id
const groupSchema = new Schema({
    schema_version: Number,
    code: Number,
    name: String,
    members: [{ userId: Number }],
    events: [{ eventId: Number }],
});

module.exports = mongoose.model('Group', groupSchema);