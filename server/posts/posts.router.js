const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts(req.query);

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    return {
      ...post,
      images: data.map(photo => photo.url)
    }
  }));
  res.json(postsWithImages);
});

module.exports = router;
