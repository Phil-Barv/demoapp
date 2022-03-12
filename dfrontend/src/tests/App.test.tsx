/* Initial tests for navigating through the frontend 
and computing the percentage of a project's current account. */

import React from 'react';
import {cleanup, fireEvent, getDefaultNormalizer, render, screen} from '@testing-library/react';
import App from './../App';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ProjectCard from './../components/project-card';


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

test('check that the remaining money for project is accurately calculated', () => {
  render(<ProjectCard
      pk={0} donorID={0} name="Project Test 123"
      description="Testing Project to improve the security of our transactions."
      raised={20} target={40} />)
  const headingElement = screen.getByText('50% raised', {
    exact:false,
    normalizer: str => getDefaultNormalizer({trim: false})(str).replace(/[\u200E-\u200F]*/g, ''),
  })
  expect(headingElement).toBeInTheDocument();
});
