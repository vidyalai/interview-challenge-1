const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
  
  const posts = await fetchPosts();
  // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const user_data = await fetchUserById(post.userId)
        return {
          ...post,
          images: res.data,
          user: user_data
        };
      } catch (err) {
        console.log(err.message);
        return {
          ...post,
          images: []
        }; 
      }
    })
  );
  
  res.json(postsWithImages);
  }

  catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
});

module.exports = router;
