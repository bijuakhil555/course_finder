import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SearchContextProvider } from './Context/searchContext';


ReactDOM.render(
  <React.StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

