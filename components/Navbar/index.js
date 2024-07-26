import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  padding: '10px 0',
  display: 'flex',
  justifyContent: 'center',
}));

const List = styled('ul')(() => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
}));

const ListItem = styled('li')(() => ({
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <List>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </List>
    </Navbar>
  );
};

export default TopNavbar;
