const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { query } = req;
    const posts = await fetchPosts(query);

    const imageRequests = posts.map(post =>
      axios.get(
        `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
      ),
    );
    const imageResponses = await Promise.all(imageRequests);

    const postsWithImages = posts.map((post, index) => ({
      ...post,
      images: imageResponses[index].data,
    }));

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts with images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
