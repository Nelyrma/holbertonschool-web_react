import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { hideDrawer, showDrawer, markNotificationAsRead } from '../../redux/notifications/notificationsSlice';

const mockStore = configureStore([]);

describe('Notifications component with Redux', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
        ],
        displayDrawer: true,
      }
    });

    store.dispatch = jest.fn();
  });

  test('displays notifications list when displayDrawer is true', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('clicking close button hides the drawer', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);
    expect(store.dispatch).toHaveBeenCalledWith(hideDrawer());
  });

  test('clicking "Your notifications" shows the drawer', () => {
    store = mockStore({
      notifications: {
        notifications: [],
        displayDrawer: false,
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByText('Your notifications'));
    expect(store.dispatch).toHaveBeenCalledWith(showDrawer());
  });

  test('markNotificationAsRead dispatches correct action', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notif = screen.getByText('New course available');
    fireEvent.click(notif);
    expect(store.dispatch).toHaveBeenCalledWith(markNotificationAsRead(1));
  });
});
