const express = require('express');
const axios = require('axios'); 
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const photosRes = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const photos = photosRes.data;

        return {
          ...post,
          images: photos.map((photo) => ({
            url: photo.url,
          })),
        };
      })
    );

    res.json(postsWithImages);
  } catch (err) {
    console.error('Error fetching posts and photos:', err);
    res.status(500).json({ error: 'Failed to fetch posts and photos' });
  }
});

module.exports = router;
