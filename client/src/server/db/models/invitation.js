const mongoose = require('mongoose');

// current model of an invitation
// stores the description of an invitation, event of interest, and a list of users it was sent to and was accepted by
const InvitationSchema = mongoose.Schema({
  schema_version: Number,
  description: String,
  eventId: String,
  users_sent_to: [Number],
  users_accepted: [Number],
});

// made event information embedded for performance and we do not necessarily need an event model
// made users sent to and accepted into strings for emails instead of ids.
// added invitation title
const InvitationSchemav2 = mongoose.Schema({
  schema_version: Number,
  title: String,
  description: String,
  event: {
    start: Date,
    end: Date,
    timeZone: String,
    summary: String, // the title
    description: String,
  },
  users_sent_to: [String],
  users_accepted: [String],
});

const Invitation = mongoose.model('Invitation', InvitationSchemav2);

module.exports = Invitation;