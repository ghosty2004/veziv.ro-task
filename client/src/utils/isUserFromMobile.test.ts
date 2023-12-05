import { test, expect } from 'vitest';
import { isUserFromMobile } from './isUserFromMobile';

test('Should return boolean', () => {
  expect(typeof isUserFromMobile()).toEqual('boolean');
});
