import { test, expect } from 'vitest';
import * as components from '.';

test('Should return an object with all components', () => {
  expect(components).toBeDefined();
  expect(typeof components).toBe('object');
  expect(Object.keys(components).length).toBeGreaterThan(0);
});
