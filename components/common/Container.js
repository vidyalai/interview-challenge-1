import { useContext } from 'react';
import { WindowWidthContext } from '../context/WindowWidthContext';

export default function Container({ children }) {
  const { isSmallerDevice } = useContext(WindowWidthContext);
  if (isSmallerDevice === null) {
    return null; 
  }
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
