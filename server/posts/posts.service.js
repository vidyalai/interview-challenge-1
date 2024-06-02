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

/**
 * Fetches photos for a given post ID from the JSONPlaceholder API.
 *
 * @param {number} postId - The ID of the post to fetch photos for.
 * @returns {Promise<Array>} - A promise that resolves to an array of photos.
 * @throws {Error} - If an error occurs during the API request.
 */
async function fetchAlbum(postId) {
  let images;
  try {
    images = await axios.get(`https://jsonplaceholder.typicode.com/albums/${postId}/photos`);
  } catch (error) {
    if (error.code === 'ETIMEDOUT') {
      // Retry the request once if it times out
      images = await axios.get(`https://jsonplaceholder.typicode.com/albums/${postId}/photos`);
    } else {
      // Handle other errors by throwing them
      throw error;
    }
  }
  return images.data;
}

/**
 * Fetches user data from the JSONPlaceholder API based on the provided userId.
 * @param {number} userId - The ID of the user to fetch data for.
 * @returns {Promise<Object>} - A promise that resolves to the user data.
 * @throws {Error} - If there is an error fetching the user data.
 */
async function fetchUserData(userId) {
  try {
    const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return user;
  } catch (error) {
    if (error.code === 'ETIMEDOUT') {
      // Retry the request once if it times out
      try {
        const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return user;
      } catch (error) {
        throw new Error('Failed to fetch user data');
      }
    } else {
      throw new Error('Failed to fetch user data');
    }
  }
}

module.exports = { fetchPosts, fetchAlbum, fetchUserData };
