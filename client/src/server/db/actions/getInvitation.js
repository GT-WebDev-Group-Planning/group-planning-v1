const mongoose = require('mongoose');
const connectDB = require('../connect');
const Invitation = require('../models/invitation');
require('dotenv').config();

async function getInvitation(inviteId) {
    await connectDB(process.env.MONGO_URI);
    const invitation = await Invitation.findOne({ _id: new mongoose.Types.ObjectId(inviteId) });
    return invitation;
}

module.exports = getInvitation;