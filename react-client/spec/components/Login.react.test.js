import React from 'react';
import Login from '../../src/components/Login.jsx';
import renderer from 'react-test-renderer';

test('is a stateful class component.', () => {
  expect(React.Component.isPrototypeOf(Login)).toBe(true);
});

test('one plus one equals two', () => {
  expect(1 + 1).toBe(2);
});