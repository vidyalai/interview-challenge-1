const express = require('express');
const { fetchAllUsers, fetchUserById } = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Failed to fetch all users' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await fetchUserById(userId);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(404).json({ error: `User ID not found` });
  }
});

module.exports = router;
