import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  height: '10vh',
  position: 'sticky',
  top: 0,
  left:0,
  zIndex: 1000,
});

const ListItem = styled('li')({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '10px',
});

const Link = styled('a')({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
});

const TopNavbar = () => {
  return (
    <Navbar>
      <ul>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
};

export default TopNavbar;
//  top nav bar