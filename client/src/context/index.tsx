import { ReactNode } from 'react';

import { ModalProvider } from './ModalContext';
export const ContextProvider = ({ children }: { children: ReactNode }) => (
  <ModalProvider>{children}</ModalProvider>
);

// exports
export { ModalProvider } from './ModalContext';
