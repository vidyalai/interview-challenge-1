const express = require('express');
const { fetchPosts, fetchAlbum, fetchUserData } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

const prevUserData = [];

router.get('/', async (req, res) => {
  const { start, limit } = req.query;
  const posts = await fetchPosts({ start, limit });

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const images = await fetchAlbum(post.id);

    // checking if the user data is already fetched
    if (!prevUserData[post.userId]) {
      const userData = await fetchUserData(post.userId);
      prevUserData[post.userId] = userData;
    }

    const processedPost = {
      ...post,
      images: images.map(image => ({
        url: image.thumbnailUrl,
      })),
      user : {
        name: prevUserData[post.userId].name,
        email: prevUserData[post.userId].email,
      }
    };
    return processedPost;
  }));

  res.json(postsWithImages);
});

module.exports = router;
