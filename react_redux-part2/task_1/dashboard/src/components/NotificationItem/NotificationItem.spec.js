import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../../utils/utils';

describe('NotificationItem component', () => {
  const mockMarkAsRead = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders without crashing', () => {
    render(<NotificationItem />);
  });

  test('Displays correct HTML when type is "urgent" and html prop is provided', () => {
    const props = {
      type: 'urgent',
      html: { __html: getLatestNotification() },
      markAsRead: mockMarkAsRead,
      id: 42,
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByRole('listitem');

    expect(li).toHaveStyle({ color: 'red' });
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li.innerHTML).toBe(getLatestNotification());
  });

  test('Displays correct text and style when type is "default"', () => {
    const props = {
      type: 'default',
      value: 'Default notification',
      markAsRead: mockMarkAsRead,
      id: 1,
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByText('Default notification');

    expect(li).toHaveStyle({ color: 'blue' });
    expect(li).toHaveAttribute('data-notification-type', 'default');
  });

  test('Calls markAsRead with correct ID when clicked', () => {
    const props = {
      id: 7,
      type: 'default',
      value: 'Click me',
      markAsRead: mockMarkAsRead,
    };

    render(<NotificationItem {...props} />);
    const li = screen.getByText('Click me');
    fireEvent.click(li);

    expect(mockMarkAsRead).toHaveBeenCalledWith(7);
  });

  test('Is a functional memoized component', () => {
    expect(typeof NotificationItem.type).toBe('function');
    expect(NotificationItem.$$typeof.toString()).toBe('Symbol(react.memo)');
    expect(NotificationItem.type.prototype?.isReactComponent).toBeUndefined();
  });
});

describe('NotificationItem memoization behavior', () => {
  let renderCount;

  beforeEach(() => {
    renderCount = 0;
    jest.spyOn(console, 'log').mockImplementation((msg) => {
      if (msg.includes('Rendering NotificationItem')) renderCount++;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Does not re-render with same props', () => {
    const markAsRead = jest.fn();

    const { rerender } = render(
      <NotificationItem
        id={1}
        type="urgent"
        value="Same notification"
        markAsRead={markAsRead}
      />
    );

    expect(renderCount).toBe(1);

    rerender(
      <NotificationItem
        id={1}
        type="urgent"
        value="Same notification"
        markAsRead={markAsRead}
      />
    );

    expect(renderCount).toBe(1);
  });

  test('Re-renders when text value changes', () => {
    const markAsRead = jest.fn();

    const { rerender } = render(
      <NotificationItem
        id={2}
        type="urgent"
        value="Original"
        markAsRead={markAsRead}
      />
    );

    expect(renderCount).toBe(1);

    rerender(
      <NotificationItem
        id={2}
        type="urgent"
        value="Updated"
        markAsRead={markAsRead}
      />
    );

    expect(renderCount).toBe(2);
  });

  test('Re-renders when markAsRead function reference changes', () => {
    const { rerender } = render(
      <NotificationItem
        id={3}
        type="default"
        value="Test"
        markAsRead={() => {}}
      />
    );

    expect(renderCount).toBe(1);

    rerender(
      <NotificationItem
        id={3}
        type="default"
        value="Test"
        markAsRead={() => {}}
      />
    );

    expect(renderCount).toBe(2);
  });
});
