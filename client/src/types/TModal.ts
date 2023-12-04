export type TModalTypes = 'CONFIRMATION' | 'PROMPT' | null; // maybe more types in the future...

export type TModalButtonsTypes = 'PRIMARY' | 'SECONDARY';

export type TModalConfirmationProps = {
  title: string;
  description: string;
  buttons: Array<{
    type: TModalButtonsTypes;
    uniqueId: string;
    label: string;
  }>;
};

export type TModalPromptProps = TModalConfirmationProps & {
  title: string;
  description: string;
  fields: Array<{
    type: 'TEXT' | 'PASSWORD';
    uniqueId: string;
    label: string;
    placeholder: string;
  }>;
};

export type TModalConfirmationResponse = {
  responseUniqueIdButton: string;
};

export type TModalPromptResponse = TModalConfirmationResponse & {
  responseInputs: Array<{
    uniqueId: string;
    value: string;
  }>;
};

export type TModalResponseHandler<T extends TModalTypes> = {
  handleResponse: (props: TModalResponses<T>) => void;
};

export type TModalSharedProps<T extends TModalTypes> = {
  type: T;
} & Partial<TModalResponseHandler<T>>;

export type TModalMethods = {
  showConfirmation: (
    props: TModalConfirmationProps
  ) => Promise<TModalResponses<'CONFIRMATION'>>;

  showPrompt: (props: TModalPromptProps) => Promise<TModalResponses<'PROMPT'>>;
};

export type TModalResponses<T extends TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmationResponse
  : T extends 'PROMPT'
  ? TModalPromptResponse
  : unknown;

export type TModal<T = TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmationProps & TModalSharedProps<T>
  : T extends 'PROMPT'
  ? TModalPromptProps & TModalSharedProps<T>
  : TModalSharedProps<null>;
