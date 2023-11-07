require('dotenv').config();
const connectDB = require('../connect.js');
const Invitation = require('../models/invitation.js');

async function createInvitation(inviteData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const version = 1;
    const desc = inviteData.description;
    const eventId = inviteData.eventId;
    const users_sent_to = inviteData.users_sent_to;
    const users_accepted = []
    // TODO: check if users sent to already accepted the invitation
    const invitation = new Invitation({ version, desc, eventId, users_sent_to, users_accepted });
    await invitation.save();
    return false;
  } catch (e) {
    return res.status(400).send("Unable to create invitation.");
  }
}

module.exports = createInvitation;