import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component layout tests', () => {
  it('displays "Course list" when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
  });

  it('displays "Log in to continue" when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
  });

  it('displays News from the School section and content', () => {
    render(<App />);
    expect(screen.getByText(/News from the School/i)).toBeInTheDocument();
    expect(screen.getByText(/Holberton School News goes here/i)).toBeInTheDocument();
  });
});
