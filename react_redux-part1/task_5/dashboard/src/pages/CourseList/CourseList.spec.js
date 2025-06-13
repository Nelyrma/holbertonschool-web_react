import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from "aphrodite";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Création d'un store Redux mock
const createTestStore = (initialState) =>
  configureStore({
    reducer: {
      courses: () => initialState,
    },
  });

const renderWithRedux = (ui, { initialState }) => {
  const store = createTestStore(initialState);
  return render(<Provider store={store}>{ui}</Provider>);
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('Should render the CourseList component without crashing', () => {
  const initialState = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];
  renderWithRedux(<CourseList />, { initialState });
});

test('Should render the CourseList component with 5 rows', () => {
  const initialState = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];
  renderWithRedux(<CourseList />, { initialState });

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(5); // 2 headers + 3 courses
});

test('Should render the CourseList component with 1 row when no courses', () => {
  const initialState = [];
  renderWithRedux(<CourseList />, { initialState });

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(1); // Only one row: "No course available yet"
});
