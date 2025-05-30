import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import AppContext from "../Context/context";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import { StyleSheetTestUtils } from "aphrodite";

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Footer component", () => {
  test("renders copyright with default context (not logged in)", () => {
    render(<Footer />);
    const year = getCurrentYear();
    const copy = getFooterCopy(true);
    const expectedText = `Copyright ${year} - ${copy}`;
    expect(
      screen.getByText(expectedText, { exact: false })
    ).toBeInTheDocument();

    // Vérifie que "Contact us" n’est PAS affiché
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('renders "Contact us" when user is logged in via context', () => {
    const contextValue = {
      user: {
        email: "test@mail.com",
        password: "12345678",
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact us/i })
    ).toBeInTheDocument();
  });

  test('does not render "Contact us" when user is not logged in', () => {
    const contextValue = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );

    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });
});
