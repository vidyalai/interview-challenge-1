const express = require('express');
const axios = require('axios'); // Ensure axios is imported
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Fetch photos for each post
    const postsWithImagesPromises = posts.map(async post => {
      const { data: photos } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${post.userId}/photos`,
      );
      return {
        ...post,
        images: photos.slice(0, 3).map(photo => ({ url: photo.url })),
      };
    });

    const postsWithImages = await Promise.all(postsWithImagesPromises);

    res.json(postsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
