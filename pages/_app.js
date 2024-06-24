import React from 'react';
import { WindowWidthProvider } from '../context/WindowWidthContext';

const App = ({ Component, pageProps }) => (
  // - WindowWidthProvider wraps around the Component and its pageProps to provide window width data.
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
