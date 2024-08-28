import React from 'react';
import styled from '@emotion/styled';
import useUserData from '../hooks/useUserData';
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    background-color: #f2f2f2;
    cursor: pointer;
  }
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .sort-icon {
    vertical-align: middle;
    margin-left: 5px;
  }
`;

const UserList = () => {
  const {
    users,
    columnFields,
    handleSearch,
    handleSorting,
    sortColumn,
    sortDirection,
  } = useUserData();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {columnFields.map((field) => (
              <th key={field.value}>
                <div
                  onClick={() => handleSorting(field.value)}
                  style={{ paddingBottom: 8 }}
                >
                  {field.label}
                  {sortColumn === field.value && (
                    <span className="sort-icon">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>

                {field.enableSearch && (
                  <input
                    type="text"
                    placeholder={`Search by ${field.label}`}
                    name={field.value}
                    onChange={(e) => handleSearch(field.value, e.target.value)}
                    style={{ padding: 6, width: 200 }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {columnFields.map((field) => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
};

export default UserList;