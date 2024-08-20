// WindowWidthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const WindowWidthContext = createContext();

// Create a provider component
export const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    // Initial check on mount
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup effect on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={isSmallerDevice}>
      {children}
    </WindowWidthContext.Provider>
  );
};

// Custom hook to use the WindowWidthContext
export const useWindowWidth = () => {
  const context = useContext(WindowWidthContext);
  if (context === undefined) {
    throw new Error('useWindowWidth must be used within a WindowWidthProvider');
  }
  return context;
};