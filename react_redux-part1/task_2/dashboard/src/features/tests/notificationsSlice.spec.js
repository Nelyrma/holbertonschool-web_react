import reducer, {
  showDrawer,
  hideDrawer,
  markNotificationAsRead,
  fetchNotifications,
  ENDPOINTS,
} from '../notifications/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock la fonction getLatestNotification
jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Latest notification</strong>'),
}));

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.restore();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it('should not modify notifications when showDrawer is called', () => {
    const previousState = {
      notifications: [{ id: 1, value: 'notif 1' }],
      displayDrawer: false,
    };
    const newState = reducer(previousState, showDrawer());
    expect(newState.notifications).toEqual(previousState.notifications);
  });

  it('should not modify notifications when hideDrawer is called', () => {
    const previousState = {
      notifications: [{ id: 1, value: 'notif 1' }],
      displayDrawer: true,
    };
    const newState = reducer(previousState, hideDrawer());
    expect(newState.notifications).toEqual(previousState.notifications);
  });

  it('should not remove any notification if ID does not exist', () => {
    const previousState = {
      notifications: [
        { id: 1, value: 'notif 1' },
        { id: 2, value: 'notif 2' },
      ],
      displayDrawer: true,
    };
    const newState = reducer(previousState, markNotificationAsRead(999));
    expect(newState.notifications).toHaveLength(2);
  });

  it('should set notifications to an empty array if API returns no data', async () => {
    mock.onGet(ENDPOINTS.notifications).reply(200, []);

    const store = configureStore({ reducer: { notifications: reducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.notifications).toEqual([]);
  });

  it('should not crash if fetchNotifications fails (rejected)', async () => {
    mock.onGet(ENDPOINTS.notifications).reply(500);

    const store = configureStore({ reducer: { notifications: reducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.notifications).toEqual([]); // par défaut, slice reste inchangé
  });

  it('should return a new state object (not mutate previous state)', () => {
    const prevState = {
      notifications: [{ id: 1, value: 'notif 1' }],
      displayDrawer: false,
    };
    const newState = reducer(prevState, showDrawer());
    expect(newState).not.toBe(prevState);
  });
  it('should handle markNotificationAsRead on last item', () => {
    const previousState = {
      notifications: [{ id: 99, value: 'last notif' }],
      displayDrawer: true,
    };
    const newState = reducer(previousState, markNotificationAsRead(99));
    expect(newState.notifications).toHaveLength(0);
  });

  it('should only update id=3 with formatted value', async () => {
    const fakeData = [
      { id: 1, value: 'notif 1' },
      { id: 3, value: 'old value' },
    ];

    mock.onGet(ENDPOINTS.notifications).reply(200, fakeData);

    const store = configureStore({ reducer: { notifications: reducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.notifications.find((n) => n.id === 1).value).toBe('notif 1');
    expect(state.notifications.find((n) => n.id === 3).value).toBe(
      '<strong>Latest notification</strong>'
    );
  });

  // 1. Test : État initial
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  // 2. Test : showDrawer
  it('should set displayDrawer to true when showDrawer is dispatched', () => {
    const previousState = { notifications: [], displayDrawer: false };
    const newState = reducer(previousState, showDrawer());
    expect(newState.displayDrawer).toBe(true);
  });

  // 3. Test : hideDrawer
  it('should set displayDrawer to false when hideDrawer is dispatched', () => {
    const previousState = { notifications: [], displayDrawer: true };
    const newState = reducer(previousState, hideDrawer());
    expect(newState.displayDrawer).toBe(false);
  });

  // 4. Test : markNotificationAsRead
  it('should remove the notification with given id when markNotificationAsRead is dispatched', () => {
    const previousState = {
      notifications: [
        { id: 1, value: 'notif 1' },
        { id: 2, value: 'notif 2' },
        { id: 3, value: 'notif 3' },
      ],
      displayDrawer: true,
    };

    const newState = reducer(previousState, markNotificationAsRead(2));
    expect(newState.notifications).toHaveLength(2);
    expect(newState.notifications.find((n) => n.id === 2)).toBeUndefined();
  });

  // 5. Test : fetchNotifications (thunk async)
  describe('fetchNotifications thunk', () => {
    let mock;

    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
      mock.restore();
    });

    it('should fetch notifications and update id=3 with latest notification', async () => {
      const fakeData = [
        { id: 1, value: 'notif 1' },
        { id: 2, value: 'notif 2' },
        { id: 3, value: 'notif 3' },
      ];

      mock.onGet(ENDPOINTS.notifications).reply(200, fakeData);

      const store = configureStore({
        reducer: {
          notifications: reducer,
        },
      });

      await store.dispatch(fetchNotifications());

      const state = store.getState().notifications;
      expect(state.notifications).toHaveLength(3);
      expect(state.notifications.find((n) => n.id === 3).value).toBe(
        '<strong>Latest notification</strong>'
      );
    });
  });
});
