import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Footer Component', () => {
  const getStore = (isLoggedIn) =>
    mockStore({
      auth: {
        isLoggedIn,
        user: isLoggedIn ? { email: 'test@example.com' } : {},
      },
    });

  describe('Basic Rendering', () => {
    test('Renders without crashing', () => {
      render(
        <Provider store={getStore(false)}>
          <Footer />
        </Provider>
      );
      const footerParagraph = screen.getByText(
        `Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`
      );
      expect(footerParagraph).toHaveTextContent(/copyright \d{4} - holberton school/i);
    });

    test('Does not render contact link when user is not logged in', () => {
      render(
        <Provider store={getStore(false)}>
          <Footer />
        </Provider>
      );
      const link = screen.queryByRole('link', { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });

    test('Renders contact link when user is logged in', () => {
      render(
        <Provider store={getStore(true)}>
          <Footer />
        </Provider>
      );
      const link = screen.getByRole('link', { name: /contact us/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe('Edge Scenarios', () => {
    test('Renders contact link when isLoggedIn is true but no email', () => {
      const store = mockStore({
        auth: {
          isLoggedIn: true,
          user: {},
        },
      });
      render(
        <Provider store={store}>
          <Footer />
        </Provider>
      );
      const link = screen.queryByRole('link', { name: /contact us/i });
      expect(link).toBeInTheDocument();
    });

    test('Does not render contact link when user isLoggedIn is false', () => {
      const store = mockStore({
        auth: {
          isLoggedIn: false,
          user: { email: 'test@example.com' },
        },
      });
      render(
        <Provider store={store}>
          <Footer />
        </Provider>
      );
      const link = screen.queryByRole('link', { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });
  });

  test('Should confirm Footer is a functional component', () => {
    expect(typeof Footer).toBe('function');
  });
});
