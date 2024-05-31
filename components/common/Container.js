/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { WindowContext } from '../context/WindowContext';

export default function Container({ children }) {
  const { isSmallerDevice } = useContext(WindowContext);
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
