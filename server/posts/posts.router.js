const express = require('express');
const axios = require('axios').default;
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start = 0, limit = 10 } = req.query;

  try {
   
    const posts = await fetchPosts({ start: Number(start), limit: Number(limit) });

   
    const { data: images } = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos');

    
    const postsWithImages = posts.map(post => {
     
      const postImages = images.filter(image => image.albumId === post.userId);

      return {
        ...post,
        userName: 'Leanne Graham',
        userEmail:'Sincere@april.biz',
        images: postImages.length ? postImages : images.slice(0, 10)
      };
    });

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts or images:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts or images' });
  }
});

module.exports = router;