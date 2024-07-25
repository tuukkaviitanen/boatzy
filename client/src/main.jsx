import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DiceContextProvider } from './contexts/DiceContext';
import { UserContextProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiceContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </DiceContextProvider>
  </React.StrictMode>,
);
