// pages/_app.js

import React from 'react';
import { WindowWidthProvider } from '../components/hooks/WindowWidthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <WindowWidthProvider>
      <Component {...pageProps} />
    </WindowWidthProvider>
  );
}

export default MyApp;
