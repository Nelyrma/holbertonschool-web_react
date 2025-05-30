import NotificationItem from "./NotificationItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { StyleSheetTestUtils } from "aphrodite";

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('li has attribute data-notification-type="default"', () => {
  render(<NotificationItem type="default" value="Test notification" />);
  const li = screen.getByText("Test notification");

  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute("data-notification-type", "default");
});

test('li has attribute data-notification-type="urgent"', () => {
  render(<NotificationItem type="urgent" value="Test urgent notification" />);
  const li = screen.getByText("Test urgent notification");

  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute("data-notification-type", "urgent");
});

test("renders correctly with html prop", () => {
  const htmlContent = { __html: "<strong>Test HTML notification</strong>" };
  render(<NotificationItem type="default" html={htmlContent} />);

  // Ici, on recherche le texte HTML injecté dans la balise <strong>
  const li = screen.getByText("Test HTML notification").closest("li");

  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute("data-notification-type", "default");
});

test("calls markAsRead with correct id on click", () => {
  const mockMarkAsRead = jest.fn();
  render(
    <NotificationItem
      id={42}
      type="default"
      value="Clickable notification"
      markAsRead={mockMarkAsRead}
    />
  );

  const li = screen.getByText("Clickable notification");
  fireEvent.click(li);

  expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});
