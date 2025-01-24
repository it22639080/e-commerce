import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './context/ShopContext'; // Import the context provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopContextProvider> {/* Wrap App with the provider */}
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);

reportWebVitals();
