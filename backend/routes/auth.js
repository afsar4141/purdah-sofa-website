const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordMatches = bcrypt.compareSync(password, admin.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    req.session.isAdmin = true;
    req.session.username = admin.username;

    res.json({ success: true, username: admin.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// GET /api/admin/session — used by the admin panel to check login state
router.get('/session', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.json({ loggedIn: true, username: req.session.username });
  }
  res.json({ loggedIn: false });
});

module.exports = router;