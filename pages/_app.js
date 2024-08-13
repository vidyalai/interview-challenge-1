

import React from 'react';
import WindowWidthContext, { WindowWidthProvider } from '../components/WindowWidthContext'; 

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <WindowWidthContext.Consumer>
      {({ isSmallerDevice }) => (
        <React.Fragment>
          <Component {...pageProps} isSmallerDevice={isSmallerDevice} />
        </React.Fragment>
      )}
    </WindowWidthContext.Consumer>
  </WindowWidthProvider>
);

export default App;
