require('dotenv').config();
const connectDB = require('../connect.js');
const Event = require('../models/event.js');

async function createEvent(eventData, res) {
    await connectDB(process.env.MONGO_URI);
    try {
        const schema_version = 1;
        const { start, end, timeZone, summary, description } = eventData;
        const event = new Event({ schema_version, start, end, timeZone, summary, description })
        await event.save();
        return false;
    } catch (e) {
        return res.status(400).send("Unable to create event");
    }
    
}