import { beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HorizontalLine } from './HorizontalLine';

beforeEach(() => {
  render(<HorizontalLine />);
});

test('should render a div', () => {
  expect(screen.getByTestId('horizontal-line')).toBeDefined();
});
