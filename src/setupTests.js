// ENZYME SETUP ------------------------------------------------------

import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Makes Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// --------------------------------------------------------------- END

// Prevents axios "Network Error" in Jest tests
global.XMLHttpRequest = undefined;
global.Blob = function(content, options) { return ({ content, options }); };
