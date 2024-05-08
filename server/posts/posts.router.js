const express = require('express');
const axios = require('axios'); // Import Axios
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(
      posts.map(async post => {
        try {
          // Fetch photos for each post from the provided URL
          const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
          const photos = response.data;

          // Extracting the first 3 images from the response and replacing dummy images
          const images = photos.slice(0, 3).map(photo => ({ url: photo.thumbnailUrl }));

          // Returning post object with replaced images
          return {
            ...post,
            images: images,
          };
        } catch (error) {
          console.error('Error fetching photos for post:', post.id, error);
          return {
            ...post,
            images: [], // In case of error, return an empty array for images
          };
        }
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
