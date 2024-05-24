import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ConProvider from './context/ConProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ConProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ConProvider>
  </BrowserRouter>
);


