import React from 'react';
import App from './App';

describe('Admin component', () => {
  let wrapper;
  // let instance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    // instance = wrapper.instance();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
