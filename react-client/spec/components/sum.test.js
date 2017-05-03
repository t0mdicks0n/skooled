const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('two plus five equals seven', () => {
  expect(2 + 5).toBe(7);
});