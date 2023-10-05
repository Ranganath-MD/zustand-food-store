import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

import '@mantine/core/styles.css';


root.render(
  <MantineProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
);

