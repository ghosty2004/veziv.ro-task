export type TModalTypes = 'CONFIRMATION' | 'PROMPT' | 'DATAURL_EMBED' | null; // maybe more types in the future...

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
  fields: Array<{
    type: 'TEXT' | 'PASSWORD';
    uniqueId: string;
    label: string;
    placeholder: string;
  }>;
};

export type TModalDataURLEmbedProps = TModalConfirmationProps & {
  dataURL: string;
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

export type TModalDataURLEmbedResponse = TModalConfirmationResponse;

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

  showDataURLEmbed: (
    props: TModalDataURLEmbedProps
  ) => Promise<TModalResponses<'DATAURL_EMBED'>>;
};

export type TModalResponses<T extends TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmationResponse
  : T extends 'PROMPT'
  ? TModalPromptResponse
  : T extends 'DATAURL_EMBED'
  ? TModalDataURLEmbedResponse
  : unknown;

export type TModal<T = TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmationProps & TModalSharedProps<T>
  : T extends 'PROMPT'
  ? TModalPromptProps & TModalSharedProps<T>
  : T extends 'DATAURL_EMBED'
  ? TModalDataURLEmbedProps & TModalSharedProps<T>
  : TModalSharedProps<null>;
