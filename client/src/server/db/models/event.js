const mongoose = require('mongoose');

// add recurrence data
const EventSchema = mongoose.Schema({
  schema_version: Number,
  start: Date,
  end: Date,
  timeZone: String,
  summary: String, // the title
  description: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;