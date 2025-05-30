import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notifications display', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('renders the title "Here is the list of notifications"', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders 3 <li> elements', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('renders "No new notification for now" when list is empty', () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.getByText("No new notification for now")).toBeInTheDocument();
  });

  test('does not display panel if displayDrawer is false', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={false} />);
    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('displays panel if displayDrawer is true', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('Notifications interactions', () => {
  test('logs when a notification item is clicked', () => {
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<Notifications notifications={notifications} displayDrawer={true} />);
    fireEvent.click(screen.getByRole('listitem'));
    expect(consoleSpy).toHaveBeenCalledWith("Notification 1 has been marked as read");
    consoleSpy.mockRestore();
  });

  test('calls handleDisplayDrawer when clicking on menu item', () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={[]}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={() => {}}
      />
    );
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test('calls handleHideDrawer when clicking close button', () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        notifications={[]}
        displayDrawer={true}
        handleDisplayDrawer={() => {}}
        handleHideDrawer={handleHideDrawer}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});

describe('Notifications re-render optimization', () => {
  const spyRender = jest.spyOn(Notifications.prototype, 'render');
  const initialNotifications = [
    { id: 1, type: 'default', value: 'Notification 1' },
    { id: 2, type: 'urgent', value: 'Notification 2' },
  ];

  beforeEach(() => {
    spyRender.mockClear();
  });

  test("doesn't re-render if notifications length stays the same", () => {
    const { rerender } = render(
      <Notifications notifications={initialNotifications} displayDrawer={true} />
    );
    expect(spyRender).toHaveBeenCalledTimes(1);

    const updatedNotifications = [
      { id: 1, type: 'default', value: 'Notification 1 updated' },
      { id: 2, type: 'urgent', value: 'Notification 2 updated' },
    ];
    rerender(<Notifications notifications={updatedNotifications} displayDrawer={true} />);
    expect(spyRender).toHaveBeenCalledTimes(1);
  });

  test('re-renders when notifications length increases', () => {
    const { rerender } = render(
      <Notifications notifications={[initialNotifications[0]]} displayDrawer={true} />
    );
    expect(spyRender).toHaveBeenCalledTimes(1);

    const newList = [
      ...initialNotifications,
      { id: 3, type: 'urgent', value: 'Notification 3' },
    ];
    rerender(<Notifications notifications={newList} displayDrawer={true} />);
    expect(spyRender).toHaveBeenCalledTimes(2);
  });
});
