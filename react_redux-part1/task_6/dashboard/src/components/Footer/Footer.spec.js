import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { StyleSheetTestUtils } from 'aphrodite';

const mockStore = configureStore([]);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Footer component (Redux)', () => {
  test('renders copyright text', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: false,
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(
      screen.getByText(/Copyright.*Holberton School/i)
    ).toBeInTheDocument();
  });

  test('does not display contact link when user is not logged in', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: false,
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
  });

  test('displays contact link when user is logged in', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: true,
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
  });
});
