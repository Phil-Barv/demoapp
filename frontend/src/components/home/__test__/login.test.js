
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import "@testing-library/jest-dom/extend-expect";

import LoginPage from "./../login";

let container;

// call before each it() function
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

// called after each it() function
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// it() is an alias of test()
// parameters: (name of test, the function to test)
it("renders login view without crashing", ()=>{
    act(() => { ReactDOM.createRoot(container).render(<LoginPage />) });
});

