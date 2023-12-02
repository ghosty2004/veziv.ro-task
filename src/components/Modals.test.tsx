import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ModalContainer } from './Modals';
import { ModalProvider } from '@/context';

test('Should render a component', () => {
  expect(
    render(<ModalContainer />, {
      wrapper: ModalProvider,
    })
  ).toBeDefined();
});
