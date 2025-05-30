// task_2/dashboard/src/Login/Login.spec.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Component", () => {
  test("submit button disabled with invalid email or short password", () => {
    render(<Login logIn={jest.fn()} email="" password="" />);

    const submitButton = screen.getByRole("button", { name: /OK/i });
    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(submitButton).toBeEnabled();
  });

  test("calls logIn prop with email and password on submit", () => {
    const mockLogIn = jest.fn();
    render(<Login logIn={mockLogIn} email="" password="" />);

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole("button", { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockLogIn).toHaveBeenCalledTimes(1);
    expect(mockLogIn).toHaveBeenCalledWith("test@example.com", "password123");
  });
});
