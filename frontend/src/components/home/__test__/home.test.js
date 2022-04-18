
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

  it("if the current state is donor the form tells the viewer to login as a donor", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage user="Donor"/>) });
    const formHeading = screen.getByTestId('formHeading');
    expect(formHeading).toHaveTextContent("Login as Donor");
  });

  it("if the current state is charity the form tells the viewer to login as a charity", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage user="Charity"/>) });
    const formHeading = screen.getByTestId('formHeading');
    expect(formHeading).toHaveTextContent("Login as Charity");
  });

  it("login button enabled with  valid emails and strong passwords", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');
    const loginSubmitButton = screen.getByTestId('loginSubmitButton');

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva.com'}})
    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})
    expect(loginSubmitButton).not.toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'ben@stanford.org'}})
    fireEvent.change(passwordInputField, {target: {value: 'Noa1342sa!@sag!'}})
    expect(loginSubmitButton).not.toBeDisabled();
  });

  it("login button disabled with strong password and invalid email: missing '.com, .org, etc'", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})
    fireEvent.change(emailInputField, {target: {value: 'ben@minerva'}})
    expect(loginSubmitButton).toBeDisabled();
  
  });

  it("login button disabled with strong password and invalid email: two periods before 'com' ", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva..com'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva..edu'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva..org'}})
    expect(loginSubmitButton).toBeDisabled();
  
  });

  it("login button disabled with strong password and invalid email: missing value before .", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})

    fireEvent.change(emailInputField, {target: {value: 'ben@.com'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'ben@.org'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'ben@.edu'}})
    expect(loginSubmitButton).toBeDisabled();

  });

  it("login button disabled with strong password and invalid email: missing @", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})
    fireEvent.change(emailInputField, {target: {value: 'benminerva.com'}})
    expect(loginSubmitButton).toBeDisabled();
  });

  it("login button disabled with strong password and invalid email: maximum character count", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})

    // valid email with just 100 characters 
    fireEvent.change(emailInputField, {target: {value: 'A000060000000007000000000900000000@0010000800000000020000020000000030000000004000000000500000000.com'}})
    expect(loginSubmitButton).not.toBeDisabled();

     // valid email with 101 characters 
     fireEvent.change(emailInputField, {target: {value: 'A000060000000007000000000900000000@00100008000000000200000200000000300000000040000000000500000000.com'}})
     expect(loginSubmitButton).toBeDisabled();
  });

  it("login button disabled with strong password and invalid email: invalid characters", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const loginSubmitButton = screen.getByTestId('loginSubmitButton');
    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');

    fireEvent.change(passwordInputField, {target: {value: 'Test@123'}})
    fireEvent.change(emailInputField, {target: {value: 'benminerva@/.com'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'benminerva@/.com'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'benmi+nerva@.com'}})
    expect(loginSubmitButton).toBeDisabled();

    fireEvent.change(emailInputField, {target: {value: 'ben@@minerva.com'}})
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

  it("login button disabled with valid email and password over maximum characters allowed in forms", async () => {
    act(() => { ReactDOMClient.createRoot(container).render(<LoginPage />) });

    const emailInputField = screen.getByTestId('emailInputField');
    const passwordInputField = screen.getByTestId('passwordInputField');
    const loginSubmitButton = screen.getByTestId('loginSubmitButton');

    fireEvent.change(emailInputField, {target: {value: 'ben@minerva.com'}})

    // password is strong just 100 characters
    fireEvent.change(passwordInputField, {target: {value: 'Aa!0000010000000002000000000300000000040000000005000000000600000000070000000080000000090000000000000'}})
    expect(loginSubmitButton).not.toBeDisabled();

    // password is strong but over 100 characters
    fireEvent.change(passwordInputField, {target: {value: 'Aa!00000100000000020000000003000000000400000000050000000006000000000700000000800000000900000000000000'}})
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


