import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CourseList from './CourseList';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CourseList component with Redux', () => {
  it('should display "No course available yet" when courses array is empty', () => {
    const store = mockStore({
      courses: []
    });

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
  });

  it('should display the list of courses when courses are provided', () => {
    const store = mockStore({
      courses: [
        { id: 1, name: 'Course 1', credit: 60 },
        { id: 2, name: 'Course 2', credit: 30 }
      ]
    });

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
    expect(screen.getByText(/course name/i)).toBeInTheDocument();
    expect(screen.getByText(/credit/i)).toBeInTheDocument();
    expect(screen.getByText('Course 1')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('Course 2')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
