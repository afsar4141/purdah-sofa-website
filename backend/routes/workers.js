const express = require('express');
const Worker = require('../models/Worker');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const VALID_STATUSES = ['New', 'Contacted', 'Approved', 'Rejected'];

// ---------------------------------------------------------------------
// PUBLIC — called from the "Join as a Worker" registration page
// POST /api/workers
// ---------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { name, phone, skill, experience, area } = req.body;

  if (!name || !phone || !skill || !area) {
    return res.status(400).json({ error: 'Name, phone, skill and area are required.' });
  }

  try {
    const worker = await Worker.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      skill: String(skill).trim(),
      experience: experience ? String(experience).trim() : null,
      area: String(area).trim()
    });

    res.status(201).json({ success: true, id: worker.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save registration. Please try again.' });
  }
});

// ---------------------------------------------------------------------
// ADMIN ONLY — everything below requires a logged-in session
// ---------------------------------------------------------------------
router.use(requireAuth);

// GET /api/workers — list all worker registrations, newest first
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ created_at: -1 });
    res.json(workers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load worker registrations.' });
  }
});

// PATCH /api/workers/:id — update status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updated = await Worker.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Worker registration not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Worker registration not found.' });
  }
});

// DELETE /api/workers/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Worker.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Worker registration not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: 'Worker registration not found.' });
  }
});

module.exports = router;