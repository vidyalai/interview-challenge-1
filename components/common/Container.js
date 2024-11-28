import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
};

const childStyles = (isSmallerDevice) => ({
  width: isSmallerDevice ? '95%' : '85%',
});

export default function Container({ children }) {
  const { isSmallerDevice } = useWindowWidth();

  return (
    <div style={containerStyles}>
      <div style={childStyles(isSmallerDevice)}>{children}</div>
    </div>
  );
}
