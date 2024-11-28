const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  fetchPosts()
    .then(posts => 
      Promise.all(
        posts.map(post =>
          axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`)
            .then(response =>
              fetchUserById(post.userId)
                .then(userData => ({
                  ...post,
                  images: response.data,
                  user: userData
                }))
                .catch(() => ({
                  ...post,
                  images: []
                }))
            )
            .catch(() => ({
              ...post,
              images: []
            }))
        )
      )
    )
    .then(postsWithImages => res.json(postsWithImages))
    .catch(error => res.status(400).json({ error: "An error occurred while processing the request." }));
});

module.exports = router;
