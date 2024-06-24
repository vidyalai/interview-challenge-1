import React from 'react';
import { useWindowWidth } from '../../context/WindowWidthContext';
import ClientOnly from '../ClientOnly';

// Container component that adjusts content based on window width
export default function Container({ children }) {
  return (
    <ClientOnly>
      <ContainerContent>{children}</ContainerContent>
    </ClientOnly>
  );
}

const ContainerContent = ({ children }) => {
  const { isSmallerDevice } = useWindowWidth();
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
};
