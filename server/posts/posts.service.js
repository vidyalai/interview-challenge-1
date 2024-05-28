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

  return posts;
}

async function fetchPostImages(imageId) {
  try {
    const { data: postImages } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${imageId}/photos`,
    );
    return postImages;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { fetchPosts, fetchPostImages };
