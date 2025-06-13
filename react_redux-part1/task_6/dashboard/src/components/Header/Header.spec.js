import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { StyleSheetTestUtils } from 'aphrodite';

jest.mock('../../assets/holberton-logo.jpg', () => 'mocked-logo.jpg');

const mockStore = configureStore([]);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header component (Redux version)', () => {
  test('renders logout section when user is logged in', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: true,
        user: { email: 'user@example.com' }
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
  });

  test('does not render logout section when user is not logged in', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
  });

  test('dispatches logout action on logout click', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: true,
        user: { email: 'user@example.com' }
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    fireEvent.click(screen.getByRole('link', { name: /logout/i }));
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });
});
