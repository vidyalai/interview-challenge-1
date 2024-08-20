// pages/_app.js
import React from 'react';
import { WindowWidthProvider } from '../components/contexts/useWindowWidth'; // Adjust the import path as necessary

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;