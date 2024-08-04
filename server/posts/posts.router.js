const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();
    const postsWithImagesAndUsers = await Promise.all(
      posts.map(async (post) => {
        const [photosResponse, user] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`),
          fetchUserById(post.userId)
        ]);

        const photos = photosResponse.data;
        return {
          ...post,
          images: photos.map(photo => ({ url: photo.url })),
          user: {
            name: user.name,
            email: user.email,
            username: user.username,
          }
        };
      })
    );
    res.json(postsWithImagesAndUsers);

  } catch (error) {
    console.error('Error fetching posts or photos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
