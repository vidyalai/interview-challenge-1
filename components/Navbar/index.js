import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky', //made the top nav bar sticky during scrolling
  top: 0,
  left: 0,
  zIndex: 1000,
  padding: '10px 0', // Added padding for better spacing
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added subtle shadow for depth
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
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
        <ul style={{}}>
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
