import { test, expect } from 'vitest';
import { Portfolio } from './Portfolio';

test('Should render a component', () => {
  expect(Portfolio()).toBeDefined();
});
