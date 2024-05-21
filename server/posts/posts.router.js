    
const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  
  try {
    const posts = await fetchPosts(req.query);

    // Fetch photos for each post concurrently
    const postsWithImages = await Promise.all(posts.map(async (post) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
      const photos = response.data;

      const images = photos.map(photo => ({ url: photo.url }));

      return {
        ...post,
        images,
      };
    }));

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts or images:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts or images' });
  }
});

module.exports = router;
