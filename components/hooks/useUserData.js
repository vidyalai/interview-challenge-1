import axios from "axios";

const { useState, useEffect } = require("react")

const columnFields = [
    { value: 'id', label: 'Id' },
    { value: 'name', label: 'Name', enableSearch: true },
    { value: 'email', label: 'Email', enableSearch: true },
    { value: 'username', label: 'Username' },
    { value: 'phone', label: 'Phone' },
    { value: 'website', label: 'Website' },
];

const useUserData = () => {
    const [userData, setUserData] = useState({
        users: [],
        filteredUsers: [],
        searchName: '',
        searchEmail: '',
        sortColumn: columnFields[0].value,
        sortDirection: 'asc',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get('/api/v1/users');
            setUserData(prev => ({ ...prev, users: data, filteredUsers: data }));
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        let filteredUsers = userData.users.filter(
            user => user.name.toLowerCase().includes(userData.searchName.toLowerCase()) &&
                user.email.toLowerCase().includes(userData.searchEmail.toLowerCase())
        );

        if (userData.sortColumn) {
            filteredUsers.sort((a, b) => {
                const x = a[userData.sortColumn];
                const y = b[userData.sortColumn];
                if (x < y) return userData.sortDirection === 'asc' ? -1 : 1;
                if (x > y) return userData.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setUserData(prev => ({ ...prev, filteredUsers }))

    }, [userData.searchName, userData.searchEmail, userData.sortColumn, userData.sortDirection, userData.users]);


    const handleOnSearch = event => {
        let { name, value } = event.target;

        if (name === 'name') {
            name = 'searchName';
        } else if (name === 'email') {
            name = 'searchEmail';
        } else {
            throw new Error('Unknown search element');
        }

        setUserData(prev => ({ ...prev, [name]: value }));
    }

    const handleSort = column => {
        if (userData.sortColumn === column) {
            setUserData(prev => ({ ...prev, sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc' }));
        } else {
            setUserData(prev => ({ ...prev, sortColumn: column, sortDirection: 'asc' }));
        }
    }

    return {
        users: userData.filteredUsers,
        columnFields: columnFields,
        handleOnSearch,
        handleSort,
        sortColumn: userData.sortColumn,
        sortDirection: userData.sortDirection
    }

};

export default useUserData;