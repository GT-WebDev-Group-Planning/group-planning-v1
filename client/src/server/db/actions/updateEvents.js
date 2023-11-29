const connectDB = require('../connect');
const User = require('../models/user'); // Import the User model (adjust the path accordingly)

async function updateEvents(userEmail, events) {
  try {
    console.log("Updating events for user:", userEmail); // Add this line for debugging
    //console.log("New events:", events); // Add this line for debugging

    await connectDB(process.env.MONGO_URI);

    if (!userEmail || !events) {
      console.log("Missing required properties. Cannot update events."); // Add this line for debugging
      return false; // Return false if required properties are missing
    }

    const userExists = await User.exists({ email: userEmail });

    if (userExists) {
      console.log("User exists. Updating events..."); // Add this line for debugging
      const cleanEvents = events.map(event => {
        return {
          start: event.start.dateTime,
          end: event.end.dateTime,
          summary: event.summary
        };
      });
      await User.updateOne({ email: userEmail }, { $set: { events: cleanEvents } });
      console.log("Events updated successfully."); // Add this line for debugging
      return true;
    } else {
      console.log("User not found. Cannot update events."); // Add this line for debugging
    }

    return false;
  } catch (error) {
    console.error("Error updating events:", error); // Add this line for debugging
    return false;
  }
}

module.exports = updateEvents;