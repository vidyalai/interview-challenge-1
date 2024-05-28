
const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');



const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { start, limit } = req.query;
    const posts = await fetchPosts({ start: parseInt(start), limit: parseInt(limit) });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts with images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
