// src/pages/Login/Login.spec.js
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../../tests/test-utils';
import Login from './Login';
import { store } from '../../redux/store';
import { login } from '../../features/auth/authSlice';

describe('Login component', () => {
  test('renders form elements correctly', () => {
    renderWithProvider(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('email input receives focus when label clicked', async () => {
    renderWithProvider(<Login />);

    const emailLabel = screen.getByText(/email/i);
    userEvent.click(emailLabel);

    const emailInput = screen.getByLabelText(/email/i);
    await waitFor(() => expect(emailInput).toHaveFocus());
  });

  test('password input receives focus when label clicked', async () => {
    renderWithProvider(<Login />);

    const passwordLabel = screen.getByText(/password/i);
    userEvent.click(passwordLabel);

    const passwordInput = screen.getByLabelText(/password/i);
    await waitFor(() => expect(passwordInput).toHaveFocus());
  });

  test('submit button is enabled with valid credentials', () => {
    renderWithProvider(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    // Simulate input
    fireEvent.change(emailInput, { target: { value: 'user@holberton.io' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    expect(submitButton).toBeEnabled();
  });

  test('dispatches login action on valid submit', () => {
    const spy = jest.spyOn(store, 'dispatch');

    renderWithProvider(<Login />, { store });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@holberton.io' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'holberton123' },
    });

    const submitButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(submitButton);

    expect(spy).toHaveBeenCalledWith(
      login({ email: 'test@holberton.io', password: 'holberton123' })
    );
  });
});
