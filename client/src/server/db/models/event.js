const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  schema_version: Number,
  start: Date,
  end: Date,
  recurring: {

  },
  description: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;