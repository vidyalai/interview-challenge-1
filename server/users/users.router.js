const express = require('express');
const { fetchAllUsers, fetchUserById } = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await fetchAllUsers();

  res.json(users);
});

router.get('/user/:id', async (req, res) => {
  const user = await fetchUserById(req.params.id);
  res.json(user);
})

module.exports = router;
