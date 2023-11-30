export type TModalConfirmation = {
  description: string;
  buttons: Array<{
    onClick: () => void;
    label: string;
  }>;
};

export type TModalTypes = 'CONFIRMATION' | null; // maybe more types in the future...

export type TModalSharedProps<T = TModalTypes> = {
  type: T;
};

export type TModal<T = TModalTypes> = T extends 'CONFIRMATION'
  ? TModalConfirmation & TModalSharedProps<T>
  : TModalSharedProps<T>;
