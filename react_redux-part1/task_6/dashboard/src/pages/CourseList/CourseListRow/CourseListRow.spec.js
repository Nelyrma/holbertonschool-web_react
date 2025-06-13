import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  it('renders as header with one cell spanning two columns', () => {
    render(<table><tbody><CourseListRow isHeader={true} textFirstCell="Header only" /></tbody></table>);
    const cell = screen.getByText('Header only');
    expect(cell.tagName).toBe('TH');
    expect(cell).toHaveAttribute('colspan', '2');
  });

  it('renders as header with two cells', () => {
    render(<table><tbody><CourseListRow isHeader={true} textFirstCell="Name" textSecondCell="Credit" /></tbody></table>);
    expect(screen.getByText('Name').tagName).toBe('TH');
    expect(screen.getByText('Credit').tagName).toBe('TH');
  });

  it('renders as normal row with two data cells', () => {
    render(<table><tbody><CourseListRow isHeader={false} textFirstCell="React" textSecondCell="60" /></tbody></table>);
    expect(screen.getByText('React').tagName).toBe('TD');
    expect(screen.getByText('60').tagName).toBe('TD');
  });
});
