const axios = require('axios').default;

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}

// Route to fetch user are https://jsonplaceholder.typicode.com/users/:userId

/**
 * Fetches the user by userId
 * @param {string} userId - The target userId
 * @return {object} - The object containing user name and user email
 */
async function fetchUserById(userId) {
  const { data: user } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}/`,
  );
  return { name: user.name, email: user.email };
}

module.exports = { fetchAllUsers, fetchUserById };
