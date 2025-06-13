import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

export const API_BASE_URL = 'http://localhost:5173';
export const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const notifications = response.data;
    const updatedNotifications = notifications.map((notif) =>
      notif.id === 3 ? { ...notif, value: getLatestNotification() } : notif
    );
    return updatedNotifications;
  }
);

const initialState = {
  notifications: [],
  displayDrawer: true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload;
      console.log(`Notification removed: ${id}`);
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { markNotificationAsRead, showDrawer, hideDrawer } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
