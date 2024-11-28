import axios from 'axios';
import { useEffect, useReducer } from 'react';

const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

const initialState = {
  users: [],
  filteredUsers: [],
  searchName: '',
  searchEmail: '',
  sortColumn: columnFields[0].value,
  sortDirection: 'asc',
};

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'fetch': {
      const { data } = action;
      return { ...state, users: data, filteredUsers: data };
    }
    case 'search': {
      let { name, value } = action;

      if (name === 'name') {
        name = 'searchName';
      } else if (name === 'email') {
        name = 'searchEmail';
      } else {
        throw new Error('Unknown search element');
      }

      let usersFiltered = state.users.filter(
        user =>
          user.name
            .toLowerCase()
            .includes(
              name === 'name' ? value : state.searchName.toLowerCase(),
            ) &&
          user.email
            .toLowerCase()
            .includes(
              name === 'email' ? value : state.searchEmail.toLowerCase(),
            ),
      );

      return { ...state, filteredUsers: usersFiltered, [name]: value };
    }
    case 'sort': {
      const { column } = action;

      const usersFiltered = state.filteredUsers.sort((a, b) => {
        const x = a[state.sortColumn];
        const y = b[state.sortColumn];
        if (x < y) return state.sortDirection === 'asc' ? -1 : 1;
        if (x > y) return state.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      if (state.sortColumn === column) {
        return {
          ...state,
          filteredUsers: usersFiltered,
          sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          ...state,
          filteredUsers: usersFiltered,
          sortColumn: column,
          sortDirection: 'asc',
        };
      }
    }
  }
};

export const useWithUserData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const { data: users } = await axios.get('/api/v1/users');

      dispatch({ type: 'fetch', data: users });
    })();
  }, []);

  return { state, dispatch, columnFields };
};
