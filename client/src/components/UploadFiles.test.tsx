import { beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UploadFiles } from './UploadFiles';

beforeEach(() => {
  render(<UploadFiles />);
});

test('Should contain a testId with name form', () => {
  expect(screen.getByTestId('form')).toBeDefined();
});
