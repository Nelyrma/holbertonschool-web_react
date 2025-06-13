import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('renders with title and children', () => {
    render(
      <BodySectionWithMarginBottom title="Margin Title">
        <p>Some content here</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByText('Margin Title')).toBeInTheDocument();
    expect(screen.getByText('Some content here')).toBeInTheDocument();
  });
});
