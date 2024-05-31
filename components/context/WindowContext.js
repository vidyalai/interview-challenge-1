/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';

export const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowContext.Provider>
  );
};
