import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { store } from './redux/store';
import { firebaseConfig } from './firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...firebaseConfig}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
