import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  test('renders with title and children', () => {
    render(
      <BodySection title="Test Title">
        <p>Child content</p>
      </BodySection>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
