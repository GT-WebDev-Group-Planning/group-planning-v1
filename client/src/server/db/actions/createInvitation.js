require('dotenv').config();
const connectDB = require('../connect.js');
const Invitation = require('../models/invitation.js');

async function createInvitation(inviteData, res) {
  await connectDB(process.env.MONGO_URI);
  try {
    const version = 2;
    const title = inviteData.title;
    const desc = inviteData.description;
    const eventData = inviteData.eventData;
    const users_sent_to = inviteData.users_sent_to;
    const users_accepted = []
    // TODO: check if users sent to already accepted the invitation
    const invitation = new Invitation({
      schema_version: version, 
      title: title, 
      description: desc, 
      event: eventData, 
      users_sent_to: users_sent_to, 
      users_accepted: users_accepted
    });
    await invitation.save();
    return invitation;
  } catch (e) {
    return res.status(400).send("Unable to create invitation.");
  }
}

module.exports = createInvitation;