import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from '../../redux/auth/authSlice';

// Mock de l’action login
jest.mock('../../redux/auth/authSlice', () => ({
  ...jest.requireActual('../../redux/auth/authSlice'),
  login: jest.fn((payload) => ({ type: 'auth/login', payload })),
}));

const renderWithRedux = (ui, { initialState } = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: initialState || {},
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Login Component Tests (Redux version)', () => {
  test('Displays form elements correctly', () => {
    renderWithRedux(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  test('Submit button enables only with valid email and password', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'valid@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'longenough' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('Dispatches login action on valid submit', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
  });

  test('Clicking labels focuses input fields', async () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const emailLabel = screen.getByText('Email');
    userEvent.click(emailLabel);
    await waitFor(() => expect(emailInput).toHaveFocus());

    const passwordInput = screen.getByLabelText('Password');
    const passwordLabel = screen.getByText('Password');
    userEvent.click(passwordLabel);
    await waitFor(() => expect(passwordInput).toHaveFocus());
  });

  test('Initial state has empty email and password', () => {
    renderWithRedux(<Login />);
    expect(screen.getByLabelText(/email/i).value).toBe('');
    expect(screen.getByLabelText(/password/i).value).toBe('');
  });
});
