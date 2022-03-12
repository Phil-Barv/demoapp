import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { store } from './redux/store';

class ErrorBoundary extends React.Component {

  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error:any) {
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    console.log(error, errorInfo);
  };

  render() {
    return this.props.children; 
  }
};

const AppWrapper = () => {

  return(
    <Provider store={store}>
      <React.StrictMode>
      <ErrorBoundary>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    </Provider>
  )
}


ReactDOM.render( <AppWrapper />, document.getElementById('root') );

reportWebVitals();

export default AppWrapper;