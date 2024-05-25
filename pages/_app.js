import React from 'react';
import {WindowWidthContextProvider} from '../context/WindowWidth'


const App = ({ Component, pageProps }) => (
  <WindowWidthContextProvider>
    <Component pageProps={pageProps}/>
  </WindowWidthContextProvider>
);

export default App;
