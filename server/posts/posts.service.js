const axios = require('axios').default;

/**
 * @async
 * @param {Object} [params] 
 * @param {number} [params.start=0] 
 * @param {number} [params.limit=10]
 * @returns {Promise<Array>} 
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

  return posts;
}

module.exports = { fetchPosts };