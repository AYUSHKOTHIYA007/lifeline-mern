

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// This is the standard entry point for a React application.
// It finds the 'root' div in your public/index.html file and
// tells React to render your main App component inside of it.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);