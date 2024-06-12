const axios = require('axios').default;

async function fetchAllUsers() {
  try {
    const { data: users } = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );

    return users;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetching user details using userId
 * Returns user with given userId
 */
// Route to fetch user are https://jsonplaceholder.typicode.com/users/:userId
async function fetchUserById(userId) {
  try {
    const { data: user } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { fetchAllUsers, fetchUserById };
