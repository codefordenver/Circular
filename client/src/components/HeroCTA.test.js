import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeroCTA from './HeroCTA';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<HeroCTA />);

  return {
    enzymeWrapper
  };
}

describe('HeroCTA', () => {
  const { enzymeWrapper } = setup();

  it('renders self', () => {
    expect(enzymeWrapper.find('h1').exists()).toBe(true);
  });
});
