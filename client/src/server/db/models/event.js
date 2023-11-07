const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  schema_version: Number,
  _id: String,
});