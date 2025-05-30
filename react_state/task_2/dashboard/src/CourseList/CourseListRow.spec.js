import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('When isHeader is true', () => {
  test('Check whether the component renders one columnheader that has the attribute colspan = 2', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Only one header" />
        </tbody>
      </table>
    );

    const cols = screen.getAllByRole('columnheader');
    expect(cols).toHaveLength(1);
    expect(cols[0]).toHaveAttribute('colspan', '2');
  });

  test('Check whether the component renders 2 <th> cells when 2 headers are passed', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header 1" textSecondCell="Header 2" />
        </tbody>
      </table>
    );

    const cols = screen.getAllByRole('columnheader');
    expect(cols).toHaveLength(2);
  });

  // Test de style à désactiver à cause de Aphrodite
  /*
  test('Header row has correct background color', () => {
    ...
  });
  */
});

describe('When isHeader is false', () => {
  test('Check if it renders two td elements with correct text content', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="Row cell 1" textSecondCell="Row cell 2" />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('Row cell 1');
    expect(cells[1]).toHaveTextContent('Row cell 2');
  });

  // Test de style à désactiver à cause de Aphrodite
  /*
  test('Regular row has correct background color', () => {
    ...
  });
  */
});
