/**
 * server.js
 * -----------------------------------------------------------------------
 * Main entry point for the Purdah-Sofa backend.
 *
 * What this server does:
 *   1. Connects to MongoDB Atlas (the database lives on MongoDB's own
 *      servers, so it stays safe even if this hosting platform restarts).
 *   2. Exposes public API endpoints the website's frontend calls when
 *      someone submits the "Book Free Measurement", "Contact Us", or
 *      "Join as a Worker" forms.
 *   3. Exposes admin-only API endpoints (login required) to view, update
 *      and delete those bookings/messages/registrations.
 *   4. Serves a simple Admin Panel (plain HTML/CSS/JS) at /admin where
 *      you log in and manage everything from a browser — no coding
 *      needed day-to-day.
 * -----------------------------------------------------------------------
 */

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const connectDB = require('./db');
const bookingsRouter = require('./routes/bookings');
const contactsRouter = require('./routes/contacts');
const workersRouter = require('./routes/workers');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

// ---------------------------------------------------------------------
// CORS — only allow the frontend origins listed in .env to call the API
// ---------------------------------------------------------------------
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true
}));

app.use(express.json());

// ---------------------------------------------------------------------
// Sessions — used for admin login only (public form endpoints don't need it)
// ---------------------------------------------------------------------
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,          // true in production (requires HTTPS)
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 8     // 8 hour login session
  }
}));

// ---------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------
app.use('/api/bookings', bookingsRouter);   // POST is public, rest need login
app.use('/api/contacts', contactsRouter);   // POST is public, rest need login
app.use('/api/workers', workersRouter);     // POST is public, rest need login
app.use('/api/admin', authRouter);          // login / logout / session check

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ---------------------------------------------------------------------
// Admin Panel (static files, served by this same server)
// ---------------------------------------------------------------------
// Visiting /admin directly (with nothing after it) sends you to the login page
app.get('/admin', (req, res) => res.redirect('/admin/login.html'));

app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

// ---------------------------------------------------------------------
// Fallback error handler
// ---------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// ---------------------------------------------------------------------
// Connect to the database, THEN start listening for requests
// ---------------------------------------------------------------------
async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Purdah-Sofa backend running on http://localhost:${PORT}`);
    console.log(`Admin panel available at   http://localhost:${PORT}/admin`);
  });
}

start();