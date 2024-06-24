const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts(req.query);

    // Function to fetch images for each post
    const fetchImages = async postId => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${postId}/photos`,
      );
      return response.data.map(photo => ({ url: photo.url }));
    };

    // Array to hold all promises for fetching images and user details
    const postPromises = posts.map(async post => {
      const images = await fetchImages(post.id);
      const user = await fetchUserById(post.userId);
      return {
        ...post,
        images: images.slice(0, 3), // Take only the first 3 images
        user: {
          name: user.name,
          email: user.email,
        },
      };
    });

    const postsWithImagesAndUser = await Promise.all(postPromises);

    res.json(postsWithImagesAndUser);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

module.exports = router;
