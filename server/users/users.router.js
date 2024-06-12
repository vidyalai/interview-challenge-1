const express = require('express');
const { fetchAllUsers } = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await fetchAllUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch user data',
      error,
    });
  }
});

module.exports = router;
