const express = require('express');
const Contact = require('../models/Contact');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const VALID_STATUSES = ['New', 'Replied', 'Closed'];

// ---------------------------------------------------------------------
// PUBLIC — called from the website's "Contact Us" form
// POST /api/contacts
// ---------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone and message are required.' });
  }

  try {
    const contact = await Contact.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      message: String(message).trim()
    });

    res.status(201).json({ success: true, id: contact.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save message. Please try again.' });
  }
});

// ---------------------------------------------------------------------
// ADMIN ONLY
// ---------------------------------------------------------------------
router.use(requireAuth);

// GET /api/contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ created_at: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load contact messages.' });
  }
});

// PATCH /api/contacts/:id — update status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Contact message not found.' });
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Contact message not found.' });
  }
});

module.exports = router;