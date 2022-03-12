import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("donatello");
  expect(linkElement).toBeInTheDocument();
});

/*
Test user login authentication

Test button loading sending you to correct pages

Test percentage on project calculated well in range between 0-100%



*/
