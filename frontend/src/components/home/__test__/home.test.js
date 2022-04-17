
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as ReactDOMClient from 'react-dom/client';
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

  it("renders login form without crashing", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });
    const form = screen.getByTestId('loginForm');
    expect(form);
  });

  it("form has a submit button", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });
    const form = screen.getByTestId('loginForm');
    const submitButton = screen.getByTestId('loginSubmitButton');
    expect(form).toContainElement(submitButton);
  });

  it("submit button says login", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });
    const submitButton = screen.getByTestId('loginSubmitButton');
    expect(submitButton).toHaveTextContent("Login");
  });

  it("form has 'register instead' button", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });
    const registerButton = screen.getByTestId('registerInsteadButton');
    expect(registerButton).toHaveTextContent("Register Instead");
  });

  it("login button enabled with valid email and strong password", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva.com'}})
    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    expect(loginSubmitButton).not.toBeDisabled();
  });

  it("login button disabled with invalid email and strong password", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva'}})
    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    expect(loginSubmitButton).toBeDisabled();
  });

  it("login button disabled with valid email and weak password", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva.com'}})
    fireEvent.change(passwordInputField, {target: {value: 'password'}})

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    expect(loginSubmitButton).toBeDisabled();
  });

  it("login button disabled with invalid email and weak password", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva'}})
    fireEvent.change(passwordInputField, {target: {value: 'password'}})

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    expect(loginSubmitButton).toBeDisabled();
  });



})

/*
describe('register view', () => {

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders register view without crashing", ()=>{
    act(() => { ReactDOM.createRoot(container).render(<Register />) });
  });

});*/


