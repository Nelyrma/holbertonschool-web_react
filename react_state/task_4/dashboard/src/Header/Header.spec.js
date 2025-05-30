import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import AppContext from "../Context/context";
import { StyleSheetTestUtils } from "aphrodite";

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test("h1 element with the text School Dashboard is rendered", () => {
  render(<Header />);
  const heading = screen.getByRole("heading", { name: /School Dashboard/i });
  expect(heading).toBeInTheDocument();
});

test("an img element is rendered", () => {
  render(<Header />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});

test("does not render logout section if user is not logged in", () => {
  const contextValue = {
    user: { email: "", password: "", isLoggedIn: false },
    logOut: jest.fn(),
  };
  render(
    <AppContext.Provider value={contextValue}>
      <Header />
    </AppContext.Provider>
  );
  const logoutSection = screen.queryByTestId("logoutSection");
  expect(logoutSection).not.toBeInTheDocument();
});

test("renders logout section if user is logged in", () => {
  const contextValue = {
    user: { email: "user@mail.com", password: "pass", isLoggedIn: true },
    logOut: jest.fn(),
  };
  render(
    <AppContext.Provider value={contextValue}>
      <Header />
    </AppContext.Provider>
  );
  const logoutText = screen.getByText(/Welcome user@mail.com/i);
  expect(logoutText).toBeInTheDocument();
  const logoutLink = screen.getByText("(logout)");
  expect(logoutLink).toBeInTheDocument();
});

test("calls logOut function when logout link is clicked", () => {
  const logOutMock = jest.fn();
  const contextValue = {
    user: { email: "test@mail.com", password: "12345678", isLoggedIn: true },
    logOut: logOutMock,
  };

  render(
    <AppContext.Provider value={contextValue}>
      <Header />
    </AppContext.Provider>
  );

  const logoutLink = screen.getByText("(logout)");
  fireEvent.click(logoutLink);
  expect(logOutMock).toHaveBeenCalled();
});
