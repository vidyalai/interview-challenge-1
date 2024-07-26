import React from 'react';
import { WindowWidthProvider } from '../components/context/windowWidthContext';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
