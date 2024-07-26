import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'fixed', // Changed to fixed for sticky behavior
  top: 0,
  left: 0,
  zIndex: 1000,
  transition: 'all 0.2s ease-in-out', // Add transition for smooth effect
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
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowScrollY = window.scrollY;
      setIsSticky(windowScrollY > 0); // Update isSticky based on scroll position
    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    return () => window.removeEventListener('scroll', handleScroll); // Clean up on unmount
  }, []);

  return (
    <div ref={navbarRef}>
      <Navbar className={isSticky ? 'sticky' : ''}>  {/* Apply sticky class conditionally */}
        <ul style={{}}>
          <ListItem>
            <Link href={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={'/users'}>Users</Link>
          </ListItem>
        </ul>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
