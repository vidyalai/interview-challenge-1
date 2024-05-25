const axios = require('axios');
const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    return {
      ...post,
      images: response.data.map(photo => ({ url: photo.url })),
    };
  }));

  res.json(postsWithImages);
});

module.exports = router;