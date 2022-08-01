import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ShopContenxtProvider } from './components/ShopContext';

ReactDOM.render(
  <React.StrictMode>
    <ShopContenxtProvider>
      <App />
    </ShopContenxtProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
