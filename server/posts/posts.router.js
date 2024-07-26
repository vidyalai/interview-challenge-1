const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios =require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const posts=await fetchPosts();
    const postsWithImages=await Promise.all(posts.map(async(post)=>{
      try{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const photos = response.data;
        return {
          ...post,
          images:photos.map(photo=>({url:photo.url})),
        };
      }catch(error){
        console.error(`Error while fetching ${post.id}`,error);
        return {
          ...post,
          images:[],
        };
      }
    }));
    res.json(postsWithImages);
  }catch(error){
    console.error('Error fetching photots or albums',error);
    res.status(500).json({message:'Error while fetching posts or albums'});
  }
});

module.exports = router;
