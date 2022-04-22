import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import {screen} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import AddProjectForm from "./../addProjectForm";

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
it("rendersform view without crashing", ()=>{
    act(() => { ReactDOM.createRoot(container).render(<AddProjectForm />) });
});

it("form has a submit button", () => {
    //  act ensures render is completed before running asserts 
    act(() => { ReactDOM.createRoot(container).render(<AddProjectForm />) });
    const form = screen.getByTestId('add-project-form');
    const submitButton = screen.getByTestId('add-project-submit-button');
    expect(form).toContainElement(submitButton);
});