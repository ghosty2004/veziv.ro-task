import { ReactNode } from 'react';

import { ModalProvider } from './ModalContext';
import { UserProvider } from './UserContext';

export const ContextProvider = ({ children }: { children: ReactNode }) => (
  <ModalProvider>
    <UserProvider>
      <>{children}</>
    </UserProvider>
  </ModalProvider>
);

// exports
export * from './ModalContext';
export * from './UserContext';
