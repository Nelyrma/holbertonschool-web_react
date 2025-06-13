import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import { StyleSheetTestUtils } from 'aphrodite';

// Supprime l'injection des styles Aphrodite pendant les tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

// Mock de BodySection
const mockBodySection = jest.fn();
jest.mock('../../components/BodySection/BodySection.jsx', () => {
  const MockBodySection = (props) => {
    mockBodySection(props);
    return (
      <div>
        <h2>{props.title}</h2>
        {props.children}
      </div>
    );
  };
  MockBodySection.displayName = 'MockBodySection';
  return MockBodySection;
});

describe('BodySectionWithMarginBottom', () => {
  test('Should render BodySection inside a wrapper div with expected content', () => {
    render(
      <BodySectionWithMarginBottom title="Hello!">
        <p>This is child content</p>
        <span>Hey there!</span>
      </BodySectionWithMarginBottom>
    );

    const wrapper = screen.getByTestId('body-section-with-margin');
    expect(wrapper).toBeInTheDocument();

    expect(mockBodySection).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Hello!',
        children: expect.anything(),
      })
    );

    expect(wrapper).toHaveTextContent('Hello!');
    expect(wrapper).toHaveTextContent('This is child content');
    expect(wrapper).toHaveTextContent('Hey there!');
  });
});
