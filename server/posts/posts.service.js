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

  posts.totalPosts = 100;

  return posts;
}

/**
 * Function used to fetch images for the corresponding post id
 * @async
 * @param {number} postId - id used to fetch images corresponding to the posts
 * @returns {Object} - array of images
 */

async function fetchImages(postId) {
  try {
    const images = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${postId}/photos`,
    );

    return images;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

module.exports = { fetchPosts, fetchImages };
