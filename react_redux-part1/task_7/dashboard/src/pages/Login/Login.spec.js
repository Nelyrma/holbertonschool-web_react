import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from '../../redux/auth/authSlice'; // à adapter selon ton arborescence

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

test('Testing signin form elements', () => {
  renderWithRedux(<Login />);
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: 'OK' });

  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');
  expect(screen.getByLabelText(/email/i)).toBe(emailInput);
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test('Should check that the email input element will be focused whenever the associated label is clicked', async () => {
  renderWithRedux(<Login />);
  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');
  userEvent.click(emailLabel);
  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('Should check that the password input element will be focused whenever the associated label is clicked', async () => {
  renderWithRedux(<Login />);
  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');
  userEvent.click(passwordLabel);
  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('Submit button is disabled by default', () => {
  renderWithRedux(<Login />);
  const submitButton = screen.getByText('OK');
  expect(submitButton).toBeDisabled();
});

test('Submit button is enabled only with a valid email and password of at least 8 characters', () => {
  renderWithRedux(<Login />);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).not.toBeDisabled();
});

describe('Login Component Tests', () => {
  test('Should initialize with default email and password', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('Should dispatch login action on form submission', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123' });
  });

  test('Should enable the submit button only with valid email and password', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'valid@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('Should update state on email and password input change', () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

    expect(emailInput.value).toBe('newemail@test.com');
    expect(passwordInput.value).toBe('newpassword');
  });
});
