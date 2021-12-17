import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import 'modern-normalize/modern-normalize.css';
import "typeface-satisfy";
import './index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import storeObject from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeObject.store}>
      <PersistGate loading={null} persistor={storeObject.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);