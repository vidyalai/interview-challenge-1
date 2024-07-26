const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const images = photos.map(photo => ({ url: photo.url }));

    return {
      ...post,
      images: images.slice(0, 8), // Assuming we only want the first 3 images
    };
  }));

  res.json(postsWithImages);
});

module.exports = router;
