const express = require('express');
const { fetchPosts, fetchAlbum } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const images = await fetchAlbum(post.id);
    const processedPost = {
      ...post,
      images: images.map(image => ({
        url: image.thumbnailUrl,
      })),
    };
    return processedPost;
  }));

  res.json(postsWithImages);
});

module.exports = router;
