const express = require('express');
const { fetchPosts, fetchPhotos } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await posts.reduce(async (acc, post) => {
    // TODO use this route to fetch photos for each post
    // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const photos = await fetchPhotos(post);
    return [
      ...await acc,
      {
        ...post,
        images: [
          { url: photos[Math.floor(Math.random()*photos.length)].url },
          { url: photos[Math.floor(Math.random()*photos.length)].url },
          { url: photos[Math.floor(Math.random()*photos.length)].url },
        ],
      },
    ];
  }, []);

  res.json(postsWithImages);
});

module.exports = router;
