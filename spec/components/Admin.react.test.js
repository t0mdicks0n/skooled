import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Admin from '../../react-client/src/components/Admin';
import renderer from 'react-test-renderer';

describe('Admin', () => {
  test('is a stateful class component.', () => {
    expect(React.Component.isPrototypeOf(Admin)).toBe(true);
  });
});