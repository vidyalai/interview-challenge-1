import { useState, useEffect } from 'react';
import axios from 'axios';

// Column definitions
const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

// Custom hook to manage user data, filtering, and sorting
const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState(columnFields[0].value);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: users } = await axios.get('/api/v1/users');
        setUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];
        return x < y
          ? sortDirection === 'asc'
            ? -1
            : 1
          : x > y
          ? sortDirection === 'asc'
            ? 1
            : -1
          : 0;
      });
    }

    setFilteredUsers(filtered);
  }, [searchName, searchEmail, sortColumn, sortDirection, users]);

  const handleSearch = (name, value) => {
    if (name === 'name') {
      setSearchName(value);
    } else if (name === 'email') {
      setSearchEmail(value);
    }
  };

  const handleSorting = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return {
    users: filteredUsers,
    columnFields,
    handleSearch,
    handleSorting,
    sortColumn,
    sortDirection,
  };
};

export default useUserData;
