import { test, expect } from 'vitest';
import { NotFound } from './NotFound';

test('Should render a component', () => {
  expect(NotFound()).toBeDefined();
});
