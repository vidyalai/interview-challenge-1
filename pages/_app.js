import React from 'react';
import { WindowWidthProvider } from '../components/ContextApi/useWindowWidth';


const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;