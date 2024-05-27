// import React from 'react';

// const App = ({ Component, pageProps }) => (
//   <React.Fragment>
//     <Component {...pageProps} />
//   </React.Fragment>
// );

// export default App;
import React from 'react';
import { WindowWidthProvider } from '../components/hooks/useWindowWidth.js';

const App = ({ Component, pageProps }) => {
  return (
    <WindowWidthProvider>
     <Component {...pageProps} />
    </WindowWidthProvider>
  );
};

export default App;
