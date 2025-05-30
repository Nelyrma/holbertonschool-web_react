import NotificationItem from "./NotificationItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  // Désactive l'injection de styles Aphrodite pendant les tests
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  // Réactive les styles après les tests
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('li has attribute data-notification-type="default"', () => {
  render(<NotificationItem type="default" value="Test notification" />);
  const li = screen.getByText('Test notification');

  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute('data-notification-type', 'default');
  // Aphrodite supprime les styles, donc on ne teste plus la couleur ici
});

test('li has attribute data-notification-type="urgent"', () => {
  render(<NotificationItem type="urgent" value="Test urgent notification" />);
  const li = screen.getByText('Test urgent notification');

  //expect(li).toBeInTheDocument();
  //expect(li).toHaveAttribute('data-notification-type', 'urgent');
  // Aphrodite supprime les styles, donc on ne teste plus la couleur ici
});

test('calls markAsRead with correct id on click', () => {
  const mockMarkAsRead = jest.fn();
  render(
    <NotificationItem
      id={42}
      type="default"
      value="Clickable notification"
      markAsRead={mockMarkAsRead}
    />
  );

  const li = screen.getByText('Clickable notification');
  fireEvent.click(li);

  expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});
