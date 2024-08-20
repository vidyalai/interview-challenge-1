const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
// const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Fetch images for each post's album
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
          const images = response.data.map(photo => ({
            url: photo.url,
          }));

          return {
            ...post,
            images: images.slice(0, 3), // Limit to 3 images per post
          };
        } catch (error) {
          console.error(`Error fetching images for post ${post.id}:`, error);
          return {
            ...post,
            images: [], // Fallback to empty array if there's an error
          };
        }
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});

module.exports = router;