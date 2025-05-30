import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('the text content within the 2 p elements in the app-body and app-footer divs matches', () => {
  render(<Login />);
  const divbody = screen.getByText(/Login to access the full dashboard/i);
  expect(divbody).toBeInTheDocument();
});

test('renders 2 input elements', () => {
  render(<Login />);
  const labelemail = screen.getByLabelText(/Email/i);
  const labelpassword = screen.getByLabelText(/Password/i);
  expect(labelemail).toBeInTheDocument();
  expect(labelpassword).toBeInTheDocument();
});

test('renders 2 label elements with the text Email and Password', () => {
  render(<Login />);
  const labelemail = screen.getByLabelText(/email/i);
  const labelpassword = screen.getByLabelText(/password/i);
  expect(labelemail).toBeInTheDocument();
  expect(labelpassword).toBeInTheDocument();
});

test('renders a button with the text OK', () => {
  render(<Login />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});

// ✅ Nouveaux tests demandés dans la task 1 :

test('Submit button is disabled by default', () => {
  render(<Login />);
  const submitBtn = screen.getByRole('button', { name: /ok/i });
  expect(submitBtn).toBeDisabled();
});

test('Submit button is enabled only with valid email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole('button', { name: /ok/i });

  // Vide (invalide)
  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.change(passwordInput, { target: { value: '' } });
  expect(submitBtn).toBeDisabled();

  // Email invalide
  fireEvent.change(emailInput, { target: { value: 'invalid' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitBtn).toBeDisabled();

  // Mot de passe trop court
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  expect(submitBtn).toBeDisabled();

  // Valide
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitBtn).toBeEnabled();
});

test('calls logIn with email and password when form is submitted', () => {
  const logInMock = jest.fn();
  render(<Login logIn={logInMock} />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole('button', { name: /ok/i });

  // Entrée de données valides
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });

  // Soumission du formulaire
  fireEvent.click(submitBtn);

  // Vérifie que logIn est bien appelé avec les bonnes valeurs
  expect(logInMock).toHaveBeenCalledWith('test@mail.com', '12345678');
});
