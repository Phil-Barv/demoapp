import React from 'react';
import { debug } from 'console';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './../App';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';


test('make the sidebar navigatable to project browsing', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  act(()=> {
    const browse_projects_button = screen.getByText("Browse Projects");
    fireEvent.click(browse_projects_button);
  });
  const headingElement = screen.getByText("Find Meaningful Projects");
  expect(headingElement).toBeInTheDocument();
});


test('make the sidebar navigatable to user details', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  act(()=> {
    const browse_projects_button = screen.getByText("Profile Settings");
    fireEvent.click(browse_projects_button);
  });
  const headingElement = screen.getByText("Profile Information");
  expect(headingElement).toBeInTheDocument();
});

test('make the sidebar navigatable to user donations', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  act(()=> {
    const browse_projects_button = screen.getByText("Your Donations");
    fireEvent.click(browse_projects_button);
  });
  const headingElement = screen.getByText("Your Donations");
  expect(headingElement).toBeInTheDocument();
});

/*
Tests to run:


ensure title of the webpage is h1
Test user login authentication
Test button loading sending you to correct pages
Test percentage on project calculated well in range between 0-100%

*/
