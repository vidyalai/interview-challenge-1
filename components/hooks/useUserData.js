import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the columns used for sorting and filtering
const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

const useUserData = () => {
  // State variables to hold users data, filtered users data,
  // search input values, and sorting criteria
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState(columnFields[0].value); // Default sorting by 'id'
  const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction

  // Fetch users data from API on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: users } = await axios.get('/api/v1/users');
        setUsers(users);
        setFilteredUsers(users); // Initially set filtered users to all users
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error fetching data
      }
    };
    fetchData();
  }, []);

  // Effect to filter and sort users based on search inputs, sorting criteria, and direction
  useEffect(() => {
    let filteredUsers = users.filter(
      user =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    // Sort filtered users based on sortColumn and sortDirection
    if (sortColumn) {
      filteredUsers.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];
        if (x < y) return sortDirection === 'asc' ? -1 : 1;
        if (x > y) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Update filtered users state
    setFilteredUsers(filteredUsers);
  }, [searchName, searchEmail, users, sortColumn, sortDirection]);

  // Handler to update searchName or searchEmail based on input name attribute
  const handleOnSearch = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setSearchName(value);
    } else if (name === 'email') {
      setSearchEmail(value);
    } else {
      throw new Error('Unknown search element');
    }
  };

  // Handler to toggle sort direction and update sortColumn
  const handleSort = column => {
    if (sortColumn === column) {
      // If sorting by the same column, toggle sort direction
      setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // If sorting by a new column, reset sort direction to 'asc'
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Return data and handlers for use in components
  return {
    users: filteredUsers,
    searchName,
    searchEmail,
    sortColumn,
    sortDirection,
    handleOnSearch,
    handleSort,
  };
};

export default useUserData;
