import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { StyleSheetTestUtils } from "aphrodite";
// Empêche l'injection des styles dans le DOM lors des tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
describe("Header component", () => {
  test("renders Holberton logo", () => {
    render(<Header />);
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders h1 element with correct text", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /school dashboard/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
