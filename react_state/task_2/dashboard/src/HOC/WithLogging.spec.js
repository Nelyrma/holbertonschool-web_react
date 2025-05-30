import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(cleanup);

describe('WithLogging HOC', () => {
  class MockApp extends React.Component {
    render () {
      return <h1>Hello from Mock App Component</h1>;
    }
  }

  it('renders the wrapped component content', () => {
    const Wrapped = WithLogging(MockApp);
    render(<Wrapped />);
    expect(screen.getByText(/Hello from Mock App Component/i)).toBeInTheDocument();
  });

  it('logs to console on mount and unmount', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const Wrapped = WithLogging(MockApp);
    const { unmount } = render(<Wrapped />);

    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');
    unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');

    consoleSpy.mockRestore();
  });
});
