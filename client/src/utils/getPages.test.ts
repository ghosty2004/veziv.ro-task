import { test, expect } from 'vitest';
import { getPages } from './getPages';

test('Should return an array', () => {
  expect(Array.isArray(getPages())).toBe(true);
});
