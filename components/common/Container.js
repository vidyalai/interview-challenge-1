import React from 'react';
import { useWindowWidth } from '../contexts/useWindowWidth'; // Adjust the import path as necessary

export default function Container({ children }) {
  const isSmallerDevice = useWindowWidth(); // Access the context value using the custom hook

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}