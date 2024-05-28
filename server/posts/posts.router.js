const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchPostImages } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = [];
    const Posts = await fetchPosts(req.query);
    for (const post of Posts) {
      const postImages = await fetchPostImages(post.id);
      const userDetails = await fetchUserById(post.userId);
      data.push({ ...post, postImages, userDetails });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: 'Something Error Occured' });
  }
});

module.exports = router;
