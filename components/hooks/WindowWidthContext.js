import { useState, useEffect, createContext, useContext } from 'react';

const WindowWidthContext = createContext();

/**
 * Provides a context for the window width.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export function WindowWidthProvider({ children }) {
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
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
}

export { WindowWidthContext };
