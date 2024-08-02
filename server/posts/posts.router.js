const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts(req);

    const postsWithImagesPromises = posts.map(async post => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${post.id}/photos?limits`,
        {
          params: {
            _limit: 5,
          },
        },
      );
      const images = response.data.map(photo => ({ url: photo.url }));

      return {
        ...post,
        images,
      };
    });

    const postsWithImages = await Promise.all(postsWithImagesPromises);

    res.json(postsWithImages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching posts and images' });
  }
});

module.exports = router;
