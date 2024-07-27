const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Fetch all posts with user details and images
    const postsWithImagesAndUsers = await Promise.all(
      posts.map(async post => {
        try {
          // Fetch photos for each post's album
          const photosResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
          );
          const photos = photosResponse.data;

          // Fetch user details using fetchUserById
          const user = await fetchUserById(post.userId);
          const userName = user ? user.shortName : 'Unknown';
          const userEmail = user ? user.email : 'Unknown';

          // Construct the post object with images and user info
          return {
            ...post,
            images: photos.map(photo => ({ url: photo.url })),
            userName,
            userEmail,
          };
        } catch (error) {
          console.error(`Error fetching photos or user for post ${post.id}:`, error);
          return {
            ...post,
            images: [], // Return an empty array if there's an error
            userName: 'Unknown',
            userEmail: 'Unknown',
          };
        }
      }),
    );

    res.json(postsWithImagesAndUsers);
  } catch (error) {
    console.error('Error fetching posts or photos:', error);
    res.status(500).send('Server error');
  }
});



module.exports = router;
