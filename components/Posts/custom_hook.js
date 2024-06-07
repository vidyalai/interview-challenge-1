import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useCustomHook(data) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/users')
      .then((response) => {
        const filteredUsers = response.data.map(user => ({
          name: user.name,
          email: user.email
        }));
        setUsers(filteredUsers);
        console.log('Fetched users:', filteredUsers);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, [data]);

  return users;
}

export default useCustomHook;
