const mongoose = require('mongoose');

// current model of an invitation
// stores the description of an invitation, event of interest, and a list of users it was sent to and was accepted by
const InvitationSchema = mongoose.Schema({
  schema_version: Number,
  description: String,
  event: Number,
  users_sent_to: [Number],
  users_accepted: [Number],
});

const Invitation = mongoose.model('Invitation', InvitationSchema);

module.exports = Invitation;