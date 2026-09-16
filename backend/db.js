/**
 * db.js
 * -----------------------------------------------------------------------
 * Connects to MongoDB Atlas using the connection string in your .env file.
 *
 * Unlike the old SQLite setup, this database does NOT live on the same
 * server that runs this code — it lives on MongoDB's own servers. That
 * means the data is safe even if the hosting platform (e.g. Render)
 * restarts, redeploys, or wipes its own disk.
 * -----------------------------------------------------------------------
 */

const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('your-mongodb-atlas-connection-string-here')) {
    console.error('MONGODB_URI is missing or not set correctly in your .env file.');
    console.error('Get your connection string from MongoDB Atlas: Database > Connect > Drivers.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas.');
  } catch (err) {
    console.error('Could not connect to MongoDB Atlas:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;