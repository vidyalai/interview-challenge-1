const express = require('express');
const { fetchPosts, fetchImages } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts(req.query);

  // Fetching images of each post
  const postsWithData = await Promise.all(
    posts.map(async post => {
      try {
        const images = await fetchImages(post.id);

        // fetching current user data
        const { name, email } = await fetchUserById(post.userId);

        return {
          ...post,
          images: [
            { url: images.data[0].thumbnailUrl },
            { url: images.data[1].thumbnailUrl },
            { url: images.data[2].thumbnailUrl },
          ],
          user: {
            name,
            email,
          },
        };
      } catch (error) {
        console.error(error.message);
        res.status(500).json({
          message: 'Failed to fetch data for the corresponding post',
          error: error,
        });
      }
    }),
  );

  // const postsWithImages = posts.reduce((acc, post) => {
  //   // TODO use this route to fetch photos for each post
  //   // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
  //   return [
  //     ...acc,
  //     {
  //       ...post,
  //       images: [
  //         { url: 'https://picsum.photos/200/300' },
  //         { url: 'https://picsum.photos/200/300' },
  //         { url: 'https://picsum.photos/200/300' },
  //       ],
  //     },
  //   ];
  // }, []);

  res.json(postsWithData);
});

module.exports = router;
