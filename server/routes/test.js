const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// ─── POST /api/test/create-user ──────────────────────────────────────────────
// Instantly creates a user bypassing normal validation for testing purposes
router.post('/create-user', async (req, res) => {
  const { name = 'Test User', email = 'test@example.com', password = 'Password123!' } = req.body;

  try {
    // Delete if already exists to ensure clean state
    await User.deleteOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: 'Test user created successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Test user creation error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to create test user.' });
  }
});

// ─── POST /api/test/reset ────────────────────────────────────────────────────
// Drops all users from the database for a clean slate
router.post('/reset', async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ success: true, message: 'Database reset successfully. All users deleted.' });
  } catch (err) {
    console.error('Database reset error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to reset database.' });
  }
});

module.exports = router;
