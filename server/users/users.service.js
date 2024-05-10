const axios = require('axios').default;

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}
// Route to fetch user are https://jsonplaceholder.typicode.com/users/:userId
async function fetchUserById(userId) {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  
  return res.data;
}

module.exports = { fetchAllUsers, fetchUserById };
