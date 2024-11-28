import React from 'react';
import { WindowProvider } from '../components/context/WindowContext';

const App = ({ Component, pageProps }) => (
  <WindowProvider>
    <Component {...pageProps} />
  </WindowProvider>
);

export default App;
