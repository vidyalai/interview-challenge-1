import React from 'react';
import { WindowWithProvider } from '../components/hooks/WindowWithContext';

const App = ({ Component, pageProps }) => (
  <WindowWithProvider>
    <Component {...pageProps} />
  </WindowWithProvider>
);

export default App;
