import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Notifications from './Notifications';
import { getLatestNotification } from '../../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';
import {
  showNotificationDrawer,
  hideNotificationDrawer,
  markAsRead,
} from '../../features/notifications/notificationsSlice';

const mockStore = configureStore([]);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const renderWithRedux = (ui, { initialState } = {}) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

describe('Notifications component', () => {
  test('Displays title, close button, and list items when displayDrawer is true', () => {
    renderWithRedux(<Notifications />, {
      initialState: {
        notifications: {
          notifications: mockNotifications,
          displayDrawer: true,
        },
      },
    });

    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('Displays "No new notifications" when list is empty', () => {
    renderWithRedux(<Notifications />, {
      initialState: {
        notifications: {
          notifications: [],
          displayDrawer: true,
        },
      },
    });

    expect(screen.getByText(/no new notifications for now/i)).toBeInTheDocument();
  });

  test('Clicking close button dispatches hideNotificationDrawer', () => {
    const { store } = renderWithRedux(<Notifications />, {
      initialState: {
        notifications: {
          notifications: mockNotifications,
          displayDrawer: true,
        },
      },
    });

    fireEvent.click(screen.getByLabelText(/close/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(hideNotificationDrawer());
  });

  test('Clicking "Your notifications" dispatches showNotificationDrawer', () => {
    const { store } = renderWithRedux(<Notifications />, {
      initialState: {
        notifications: {
          notifications: mockNotifications,
          displayDrawer: false,
        },
      },
    });

    fireEvent.click(screen.getByText(/your notifications/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(showNotificationDrawer());
  });

  test('Clicking a notification dispatches markAsRead with correct ID', () => {
    const { store } = renderWithRedux(<Notifications />, {
      initialState: {
        notifications: {
          notifications: mockNotifications,
          displayDrawer: true,
        },
      },
    });

    fireEvent.click(screen.getByText(/new course available/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(markAsRead(1));
  });

  test('Component is memoized', () => {
    expect(typeof Notifications.type).toBe('function');
    expect(Notifications.$$typeof.toString()).toBe('Symbol(react.memo)');
  });
});
