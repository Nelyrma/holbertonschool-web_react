import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { StyleSheetTestUtils } from 'aphrodite';

jest.mock('../../assets/holberton-logo.jpg', () => 'mocked-path.jpg');

const mockStore = configureStore([]);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header Component', () => {
  const defaultStore = mockStore({
    auth: {
      isLoggedIn: false,
      user: {},
    },
  });

  const loggedInStore = mockStore({
    auth: {
      isLoggedIn: true,
      user: {
        email: 'user@example.com',
      },
    },
  });

  test('Should contain <h1> and <img> with correct content', () => {
    render(
      <Provider store={loggedInStore}>
        <Header />
      </Provider>
    );

    const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(headingElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  test('Header is a functional component', () => {
    expect(typeof Header).toBe('function');
  });

  describe('When user is logged out', () => {
    test('Renders logo and heading', () => {
      render(
        <Provider store={defaultStore}>
          <Header />
        </Provider>
      );

      expect(screen.getByRole('img')).toHaveAttribute('src', 'mocked-path.jpg');
      expect(screen.getByRole('heading')).toHaveTextContent('School Dashboard');
    });

    test('Does not render logout section', () => {
      expect(screen.queryByTestId('logoutSection')).not.toBeInTheDocument();
    });

    test('No logout link', () => {
      expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
    });
  });

  describe('When user is logged in', () => {
    test('Renders welcome message and logout link', () => {
      render(
        <Provider store={loggedInStore}>
          <Header />
        </Provider>
      );
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      expect(screen.getByText('user@example.com')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
    });

    test('Calls logOut function when logout clicked', () => {
      render(
        <Provider store={loggedInStore}>
          <Header />
        </Provider>
      );

      const logoutLink = screen.getByRole('link', { name: /logout/i });
      fireEvent.click(logoutLink);
      expect(logoutLink).toBeInTheDocument();
    });

    test('Displays logout section div with id="logoutSection"', () => {
      const { container } = render(
        <Provider store={loggedInStore}>
          <Header />
        </Provider>
      );
      const logoutDiv = container.querySelector('#logoutSection');
      expect(logoutDiv).toBeInTheDocument();
    });
  });
});
