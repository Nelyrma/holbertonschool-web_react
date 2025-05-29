import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders header, login and footer components', () => {
    render(<App />);
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });

  test('calls logOut and alerts when Ctrl + H is pressed', () => {
    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App logOut={logOutMock} />);

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
  });
});
