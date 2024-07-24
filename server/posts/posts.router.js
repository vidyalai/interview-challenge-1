const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const id = req.query.id;
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(
    posts.map(async post => {
      const { data: photos } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
      );
      return {
        ...post,
          images: photos.slice(0, 3).map(photo => ({url: photo.thumbnailUrl, title: photo.title})),
    };
    }, []),
  );

  res.json(postsWithImages);
});

module.exports = router;
