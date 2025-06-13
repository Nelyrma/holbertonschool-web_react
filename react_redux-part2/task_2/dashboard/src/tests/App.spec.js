import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as notificationAPI from '../redux/notificationSlice';
import * as courseAPI from '../redux/courseSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock fetchNotifications and fetchCourses to avoid actual API calls
jest.spyOn(notificationAPI, 'fetchNotifications').mockImplementation(() => ({
  type: 'notifications/fetchNotifications',
}));

jest.spyOn(courseAPI, 'fetchCourses').mockImplementation(() => ({
  type: 'courses/fetchCourses',
}));

describe('App Component', () => {
  it('renders Login component when isLoggedIn is false', () => {
    const store = mockStore({
      auth: { isLoggedIn: false },
      notifications: { list: [] },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
  });

  it('renders CourseList component when isLoggedIn is true', () => {
    const store = mockStore({
      auth: { isLoggedIn: true },
      notifications: { list: [] },
      courses: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
        ],
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
    expect(screen.getByText(/ES6/)).toBeInTheDocument();
    expect(screen.getByText(/Webpack/)).toBeInTheDocument();
  });

  it('calls fetchNotifications on mount', () => {
    const store = mockStore({
      auth: { isLoggedIn: false },
      notifications: { list: [] },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(notificationAPI.fetchNotifications).toHaveBeenCalled();
  });

  it('calls fetchCourses when isLoggedIn is true', () => {
    const store = mockStore({
      auth: { isLoggedIn: true },
      notifications: { list: [] },
      courses: { courses: [] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(courseAPI.fetchCourses).toHaveBeenCalled();
  });
});
