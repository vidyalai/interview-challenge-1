import React, { createContext, useState, useEffect } from 'react';

// Create the context
const WindowWidthContext = createContext();

const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isSmallerDevice = windowWidth !== null && windowWidth < 768;

  return (
    <WindowWidthContext.Provider value={{ windowWidth, isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export { WindowWidthContext, WindowWidthProvider };
