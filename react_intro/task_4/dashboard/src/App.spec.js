/* eslint-env jest */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    test('renders the header with text "School dashboard"', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: /school dashboard/i });
      expect(heading).toBeInTheDocument();
    });
  
    test('renders the body and footer text correctly', () => {
      render(<App />);
      expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`Copyright ${currentYear}`, 'i'))).toBeInTheDocument();
    });
  
    test('renders an image with alt text "holberton logo"', () => {
      render(<App />);
      const image = screen.getByAltText(/holberton logo/i);
      expect(image).toBeInTheDocument();
    });
});

describe('App component', () => {
  test('renders 2 input elements', () => {
    render(<App />);
    const inputs = screen.getAllByRole('textbox'); // 'email' and 'password' fields
    const inputElements = screen.getAllByRole('textbox').concat(screen.getAllByLabelText(/password/i));
    expect(inputElements.length).toBe(2);
  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders a button with text OK', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });
});
