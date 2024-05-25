import { createContext, useEffect, useState } from "react";

export const WindowWidthContext = createContext({
    isSmallerDevice: Boolean
});

const WindowWidthProvider = ({ children }) => {
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

    const contextValue = {
        isSmallerDevice
    }

    return <WindowWidthContext.Provider value={contextValue}>
        {children}
    </WindowWidthContext.Provider>
}

export default WindowWidthProvider;