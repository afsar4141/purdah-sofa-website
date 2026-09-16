/**
 * scripts/create-admin.js
 * -----------------------------------------------------------------------
 * Run with: npm run seed-admin
 *
 * Creates (or updates the password for) the admin account using the
 * ADMIN_USERNAME and ADMIN_PASSWORD values from your .env file. Run this
 * once after setup, and again any time you want to change the admin
 * password — just update .env and re-run this script.
 * -----------------------------------------------------------------------
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../db');
const Admin = require('../models/Admin');

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in your .env file.');
  process.exit(1);
}

(async () => {
  await connectDB();

  const passwordHash = bcrypt.hashSync(password, 10);
  const existing = await Admin.findOne({ username });

  if (existing) {
    existing.password_hash = passwordHash;
    await existing.save();
    console.log(`Admin "${username}" already existed — password updated.`);
  } else {
    await Admin.create({ username, password_hash: passwordHash });
    console.log(`Admin "${username}" created successfully.`);
  }

  console.log('You can now log in to the admin panel with this username and the password from your .env file.');
  await mongoose.disconnect();
  process.exit(0);
})();