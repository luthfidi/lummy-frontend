import React from "react";
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './styles/theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Force light mode */}
    <ColorModeScript initialColorMode="light" />
    <ChakraProvider theme={theme} colorModeManager={{ 
      get: () => 'light',
      set: () => {}, 
      type: 'localStorage'
    }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);