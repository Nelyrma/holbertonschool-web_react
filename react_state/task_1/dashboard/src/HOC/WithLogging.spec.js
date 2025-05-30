import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  it('renders the wrapped component correctly', () => {
    const Wrapped = WithLogging(MockApp);
    render(<Wrapped />);
    expect(
      screen.getByText(/Hello from Mock App Component/i)
    ).toBeInTheDocument();
  });

  it('logs component mount and unmount', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const Wrapped = WithLogging(MockApp);
    const { unmount } = render(<Wrapped />);

    expect(consoleLogSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Component MockApp is going to unmount'
    );

    consoleLogSpy.mockRestore();
  });

  it('assigns a default display name when component has no name', () => {
    const NamelessComponent = () => <p>Anonymous</p>;
    const Wrapped = WithLogging(NamelessComponent);
    render(<Wrapped />);
    expect(Wrapped.displayName).toBe('WithLogging(NamelessComponent)');
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });
});
