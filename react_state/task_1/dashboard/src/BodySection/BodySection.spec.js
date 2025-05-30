import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('BodySection component', () => {
  it('renders a heading with the title prop value', () => {
    const wrapper = shallow(<BodySection title="test title"><p>child</p></BodySection>);
    const h2 = wrapper.find('h2');
    expect(h2).toHaveLength(1);
    expect(h2.text()).toBe('test title');
  });

  it('renders the children passed to it', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>child 1</p>
        <p>child 2</p>
      </BodySection>
    );
    expect(wrapper.find('p')).toHaveLength(2);
  });
});
