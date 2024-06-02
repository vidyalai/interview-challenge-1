const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(
    posts.map(async post => {
      try {
       const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`
        );

      
        const images = response.data.map(photo => ({ url: photo.thumbnailUrl }));

      
        return {
          ...post,
          images,
        };
      } catch (error) {
        console.error(`Error fetching images for post ${post.id}:`, error.message);
       
        return {
          ...post,
          images: [],
        };
      }
    })
  );

  res.json(postsWithImages);
});

module.exports = router;
