import React from 'react';
import WindowSizeProvider from '../components/context/WindowSizeProvider';
const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <WindowSizeProvider>
      <Component {...pageProps} />
    </WindowSizeProvider>
  </React.Fragment>
);

export default App;
