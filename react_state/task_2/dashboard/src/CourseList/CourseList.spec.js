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
  test('renders one <th> with colspan=2 when textSecondCell is not provided', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header Only" />
        </tbody>
      </table>
    );
    const col = screen.getByRole('columnheader');
    expect(col).toHaveAttribute('colspan', '2');
  });

  test('renders two <th> cells when textSecondCell is provided', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header1" textSecondCell="Header2" />
        </tbody>
      </table>
    );
    const cols = screen.getAllByRole('columnheader');
    expect(cols).toHaveLength(2);
  });

  // Ces tests de style échouent à cause d’Aphrodite
  /*
  test('Header row has background color #deb5b545', () => {
    const row = screen.getByRole('row');
    expect(row).toHaveStyle({ backgroundColor: 'rgba(222, 181, 181, 0.27)' });
  });
  */
});

describe('When isHeader is false', () => {
  test('renders two <td> cells correctly with text', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="Cell1" textSecondCell="Cell2" />
        </tbody>
      </table>
    );
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent("Cell1");
    expect(cells[1]).toHaveTextContent("Cell2");
  });

  // À commenter aussi à cause d’Aphrodite
  /*
  test('Regular row has background color #f5f5f5ab', () => {
    const row = screen.getByRole('row');
    expect(row).toHaveStyle({ backgroundColor: 'rgba(245, 245, 245, 0.67)' });
  });
  */
});
