import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SearchContextProvider } from './Context/searchContext';
import store from "./redux/store"
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store} >
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

