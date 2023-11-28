const mongoose = require('mongoose');
const { Schema } = mongoose;

// id already created: _id
const groupSchema = new Schema({
    code: {
        type: Number,
        unique: true,
    },
    name: String,
    description: String,
    members: [{ userId: Number }],
    events: [{ eventId: Number }],
});

module.exports = mongoose.model('Group', groupSchema);