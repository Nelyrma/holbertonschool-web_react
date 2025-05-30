import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('<BodySection />', () => {
  test('renders a heading and children', () => {
    render(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    const heading = screen.getByRole('heading', { name: /test title/i });
    const paragraph = screen.getByText(/test children node/i);

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
