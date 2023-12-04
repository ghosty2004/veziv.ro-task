import { ModalContainer } from '@/components';
import {
  TModal,
  TModalConfirmationProps,
  TModalMethods,
  TModalPromptProps,
  TModalResponses,
} from '@/types/TModal';
import { createContext, useContext, useState, ReactNode } from 'react';

const ModalContext = createContext<(TModal & TModalMethods) | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<TModal>({
    type: null,
  });

  const showConfirmation = async (
    props: TModalConfirmationProps
  ): Promise<TModalResponses<'CONFIRMATION'>> => {
    return new Promise((response) => {
      setState({
        type: 'CONFIRMATION',
        handleResponse: (res) => {
          setState({ type: null });
          response(res);
        },
        ...props,
      });
    });
  };

  const showPrompt = async (
    props: TModalPromptProps
  ): Promise<TModalResponses<'PROMPT'>> => {
    return new Promise((response) => {
      setState({
        type: 'PROMPT',
        handleResponse: (res) => {
          setState({ type: null });
          response(res);
        },
        ...props,
      });
    });
  };

  return (
    <ModalContext.Provider value={{ ...state, showConfirmation, showPrompt }}>
      {state.type !== null && <ModalContainer />}
      <div className={state.type !== null ? 'brightness-[0.3]' : ''}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
