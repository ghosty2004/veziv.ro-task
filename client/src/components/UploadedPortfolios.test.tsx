import { beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UploadedPortfolios } from './UploadedPortfolios';
import { ModalProvider } from '@/context';

beforeEach(() => {
  const items = [
    {
      name: 'My cool portfolio',
      website: 'https://github.com/ghosty2004',
    },
    {
      name: 'My cool portfolio 2',
      website: 'https://ghosty2004.dev',
    },
  ];

  const handleRemoveItem = (_: number) => {};

  render(<UploadedPortfolios files={items} onRemoveItem={handleRemoveItem} />, {
    wrapper: ModalProvider,
  });
});

test('Should check if the length of items is 2', () => {
  const items = screen.getAllByTestId('item');
  expect(items.length).toBe(2);
});
