

const express = require('express');
const axios = require('axios').default;
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const images = photos.map(photo => ({ url: photo.url }));
    return { ...post, images };
  }));

  res.json(postsWithImages);
});

module.exports = router;