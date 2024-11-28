const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  

  const postsWithImagesPromises = posts.map(async (post) => {
    const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const images = photos.map(photo => ({ url: photo.url }));

    const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);

    
    return {
      ...post,
      images,
      user
    };
  });

  const postsWithImages = await Promise.all(postsWithImagesPromises);

  return (postsWithImages);
}

module.exports = { fetchPosts };
