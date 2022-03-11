import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import App2 from './App2';

class ErrorBoundary extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error:any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  };

  render() {
    if (!this.state) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const App = () => {

  return(
      <ErrorBoundary>
      <BrowserRouter>
          <App2/>
      </BrowserRouter>
      </ErrorBoundary>
  )
}

export default App;