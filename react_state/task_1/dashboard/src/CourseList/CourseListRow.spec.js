import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

// Désactive les styles injectés par Aphrodite pendant les tests
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('When isHeader is true', () => {
  test('renders one <th> with colspan=2 when textSecondCell is null', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="test OnlyOneCell" />
        </tbody>
      </table>
    );

    const cols = screen.getAllByRole('columnheader');
    expect(cols).toHaveLength(1);
    expect(cols[0]).toHaveAttribute('colspan', '2');
  });

  test('renders two <th> elements when textSecondCell is provided', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="test firstCell" textSecondCell="testSecondCell" />
        </tbody>
      </table>
    );

    const cols = screen.getAllByRole('columnheader');
    expect(cols).toHaveLength(2);
  });
});

describe('When isHeader is false', () => {
  test('renders two <td> elements inside a <tr>', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="test firstCell" textSecondCell="testSecondCell" />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    const cells = screen.getAllByRole('cell');

    expect(row).toBeInTheDocument();
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent("test firstCell");
    expect(cells[1]).toHaveTextContent("testSecondCell");
  });
});
