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

export type TModalConfirmationResponse = {
  uniqueId: string;
};

export type TModalResponseHandler<T extends TModalTypes> = {
  handleResponse: (props: TModalResponses<T>) => void;
};

export type TModalTypes = 'CONFIRMATION' | null; // maybe more types in the future...

export type TModalSharedProps<T extends TModalTypes> = {
  type: T;
} & Partial<TModalResponseHandler<T>>;

export type TModalMethods = {
  showConfirmation: (
    props: TModalConfirmationProps
  ) => Promise<TModalResponses<'CONFIRMATION'>>;
};

export type TModalResponses<T extends TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmationResponse
  : unknown;

export type TModal<T = TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmationProps & TModalSharedProps<T>
  : TModalSharedProps<null>;
