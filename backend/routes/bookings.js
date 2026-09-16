const express = require('express');
const Booking = require('../models/Booking');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const VALID_STATUSES = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

// ---------------------------------------------------------------------
// PUBLIC — called from the website's "Book Free Measurement" form
// POST /api/bookings
// ---------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { name, phone, service, address, date, message } = req.body;

  if (!name || !phone || !service || !address) {
    return res.status(400).json({ error: 'Name, phone, service and address are required.' });
  }

  try {
    const booking = await Booking.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      service: String(service).trim(),
      address: String(address).trim(),
      preferred_date: date ? String(date).trim() : null,
      message: message ? String(message).trim() : null
    });

    res.status(201).json({ success: true, id: booking.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save booking. Please try again.' });
  }
});

// ---------------------------------------------------------------------
// ADMIN ONLY — everything below requires a logged-in session
// ---------------------------------------------------------------------
router.use(requireAuth);

// GET /api/bookings — list all bookings, newest first
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ created_at: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load bookings.' });
  }
});

// PATCH /api/bookings/:id — update status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Booking not found.' });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Booking not found.' });
  }
});

module.exports = router;