import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../react-client/src/components/Login';
import renderer from 'react-test-renderer';

describe 
test('is a stateful class component.', () => {
  expect(React.Component.isPrototypeOf(Login)).toBe(true);
});

test('contains an image', () => {
  let wrapper = shallow(<Login />);
  expect(wrapper.contains(<img src="stock_logo.jpg" height="200" width="200"></img>)).toEqual(true);
})

test('one plus one equals two', () => {
  expect(1 + 1).toBe(2);
});