
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Faux reducer Redux qui retourne l'état mocké
const createTestStore = (initialState) =>
  configureStore({
    reducer: {
      auth: () => initialState,
    },
  });

const renderWithRedux = (ui, { initialState }) => {
  const store = createTestStore(initialState);
  return render(<Provider store={store}>{ui}</Provider>);
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Footer Component with Redux', () => {
  test('Renders without crashing and shows correct text', () => {
    renderWithRedux(<Footer />, { initialState: { isLoggedIn: false } });
    const footerText = screen.getByText(`Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`);
    expect(footerText).toBeInTheDocument();
  });

  test('Does not render contact link when not logged in', () => {
    renderWithRedux(<Footer />, { initialState: { isLoggedIn: false } });
    const link = screen.queryByRole('link', { name: /contact us/i });
    expect(link).not.toBeInTheDocument();
  });

  test('Renders contact link when logged in', () => {
    renderWithRedux(<Footer />, { initialState: { isLoggedIn: true } });
    const link = screen.getByRole('link', { name: /contact us/i });
    expect(link).toBeInTheDocument();
  });

  test('Footer is a functional component', () => {
    const FooterPrototype = Object.getOwnPropertyNames(Footer.prototype);
    expect(FooterPrototype).toEqual(expect.arrayContaining(['constructor']));
    expect(FooterPrototype).toHaveLength(1);
    expect(Footer.prototype.__proto__).toEqual({});
  });
});
