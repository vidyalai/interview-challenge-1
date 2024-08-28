const express = require('express');
const { fetchAllUsers, fetchUserById } = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
});
router.get('/userbyid', async (req, res) => {
  const users = await fetchUserById();
  res.json(users);
});

module.exports = router;
