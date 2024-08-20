// user.js
const axios = require('axios').default;

async function fetchAllUsers() {
  try {
    const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    throw new Error('Failed to fetch users');
  }
}

async function fetchUserById(userId) {
  try {
    const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error.message);
    throw new Error('User not found or API error');
  }
}

module.exports = { fetchAllUsers, fetchUserById };