const express = require('express');
const { fetchPosts, fetchImages } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const params = req.query || {};
    const posts = await fetchPosts(params);

    const postsWithImages = await posts.reduce(
      async (accPromise, post, index) => {
        try {
          const acc = await accPromise;

          // Fetch images and user details asynchronously
          const [images, user] = await Promise.all([
            fetchImages({ limit: 3, id: index + 1 }),
            fetchUserById(post.id),
          ]);

          return [
            ...acc,
            {
              ...post,
              images: images.map(i => ({ url: i.url })),
              name: user ? user.shortName : 'Unknown',
              email: user ? user.email : 'Unknown',
            },
          ];
        } catch (error) {
          console.error(`Error processing post with ID ${post.id}:`, error);
          return accPromise;
        }
      },
      Promise.resolve([]),
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});

module.exports = router;
