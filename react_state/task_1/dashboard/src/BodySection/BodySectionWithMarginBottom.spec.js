import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom component', () => {
  const wrapper = shallow(
    <BodySectionWithMarginBottom title="title test">
      <p>child content</p>
    </BodySectionWithMarginBottom>
  );

  it('contains a div with class bodySectionWithMargin', () => {
    expect(wrapper.find('div.bodySectionWithMargin')).toHaveLength(1);
  });

  it('renders the BodySection component', () => {
    expect(wrapper.find(BodySection)).toHaveLength(1);
    expect(wrapper.find(BodySection).prop('title')).toBe('title test');
  });
});
