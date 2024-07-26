import { createContext, useState, useEffect } from 'react';
export const WindowSizeContext = createContext();

const WindowSizeProvider = ({ children }) => {
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
    <WindowSizeContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeProvider;
