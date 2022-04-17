
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import "@testing-library/jest-dom/extend-expect";

import LoginPage from "./../login";
import Register from "./../register";

let container;

describe('login view', () => {

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders login view without crashing", ()=>{
    act(() => { ReactDOM.createRoot(container).render(<LoginPage />) });
  });

});

describe('register view', () => {

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders login view without crashing", ()=>{
    act(() => { ReactDOM.createRoot(container).render(<Register />) });
  });

});


