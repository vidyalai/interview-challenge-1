import axios from "axios";
import { useEffect, useState } from "react";


function useWithUserData() {
    
    const columnFields = [
      { value: 'id', label: 'Id' },
      { value: 'name', label: 'Name', enableSearch: true },
      { value: 'email', label: 'Email', enableSearch: true },
      { value: 'username', label: 'Username' },
      { value: 'phone', label: 'Phone' },
      { value: 'website', label: 'Website' },
    ];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState(columnFields[0].value);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(()=>{
    const fetchUserData = async () => {
    const { data: users } = await axios.get('/api/v1/users');
    setUsers(users);
    setFilteredUsers(users);
    }
    fetchUserData();
  },[]);

  useEffect(() => {
    let filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];
        if (x < y) return sortDirection === 'asc' ? -1 : 1;
        if (x > y) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [searchName, searchEmail, sortColumn, sortDirection, users]);

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

  const handleSort = column => {
    if (sortColumn === column) {
      setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return {
    users: filteredUsers,
    handleOnSearch,
    handleSort,
    sortColumn,
    sortDirection,

  };
};


export default useWithUserData;
