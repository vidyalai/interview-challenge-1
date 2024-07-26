// context/WindowWidthContext.js
import React, { createContext, useContext } from 'react';
import useWindowWidth from './useWindowWidth';

const WindowWidthContext = createContext();

export const useWindowWidthContext = () => useContext(WindowWidthContext);

export const WindowWidthProvider = ({ children }) => {
  const { isSmallerDevice } = useWindowWidth();

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};
