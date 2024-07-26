import React from 'react';
import { WindowProvider } from '../components/hooks/WindowContext';

const App = ({ Component, pageProps }) => (
  <WindowProvider>
    <Component {...pageProps} />
  </WindowProvider>
);

export default App;
