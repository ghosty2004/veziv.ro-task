import { useModal } from '@/context/ModalContext';
import {
  TModalConfirmationProps,
  TModalDataURLEmbedProps,
  TModalPromptProps,
  TModalResponseHandler,
} from '@/types/TModal';
import { useState } from 'react';

const Buttons = ({
  buttons,
  onButtonPress,
}: Pick<TModalConfirmationProps, 'buttons'> & {
  onButtonPress: (uniqueId: string) => void;
}) => (
  <div className="flex justify-center gap-3">
    {buttons.map(({ type, uniqueId, label }) => (
      <button
        key={uniqueId}
        className={`px-2 py-1 w-full font-bold rounded ${
          type === 'PRIMARY'
            ? 'bg-indigo-600 hover:bg-indigo-600/90 text-white'
            : 'bg-white hover:bg-white/90 text-indigo-500'
        }`}
        onClick={() => onButtonPress(uniqueId)}
      >
        {label}
      </button>
    ))}
  </div>
);

const ConfirmationModal = ({
  title,
  description,
  buttons,
  handleResponse,
}: TModalConfirmationProps & TModalResponseHandler<'CONFIRMATION'>) => {
  const handleButtonPress = (uniqueId: string) => {
    handleResponse({
      responseUniqueIdButton: uniqueId,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">{title}</span>
      <span className="text-lg text-gray-500 break-words">{description}</span>
      <Buttons buttons={buttons} onButtonPress={handleButtonPress} />
    </div>
  );
};

const PromptModal = ({
  title,
  description,
  buttons,
  fields,
  handleResponse,
}: TModalPromptProps & TModalResponseHandler<'PROMPT'>) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleButtonPress = (uniqueId: string) => {
    handleResponse({
      responseUniqueIdButton: uniqueId,
      responseInputs: Object.entries(inputValues).map(([uniqueId, value]) => ({
        uniqueId,
        value,
      })),
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <span className="text-2xl font-bold">{title}</span>
      <span className="text-lg text-gray-500 break-words">{description}</span>
      <div className="flex flex-col gap-4 max-h-[255px] overflow-auto scrollbar">
        {fields.map(({ type, uniqueId, label, placeholder }) => (
          <div className="flex flex-col" key={uniqueId}>
            <label className="text-lg text-white">{label}</label>
            <input
              type={type === 'TEXT' ? 'text' : 'password'}
              className="bg-white/10 rounded p-2 outline-none"
              placeholder={placeholder}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  [uniqueId]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      </div>
      <Buttons buttons={buttons} onButtonPress={handleButtonPress} />
    </div>
  );
};

const DataURLEmbedModal = ({
  title,
  description,
  buttons,
  dataURL,
  handleResponse,
}: TModalDataURLEmbedProps & TModalResponseHandler<'DATAURL_EMBED'>) => {
  const handleButtonPress = (uniqueId: string) => {
    handleResponse({
      responseUniqueIdButton: uniqueId,
    });
  };

  return (
    <div className="flex flex-col gap-3 w-auto">
      <span className="text-2xl font-bold">{title}</span>
      <span className="text-lg text-gray-500 break-words">{description}</span>
      <div className="flex w-[80vw] h-[65vh]">
        <iframe src={dataURL} width="100%" height="100%" />
      </div>
      <Buttons buttons={buttons} onButtonPress={handleButtonPress} />
    </div>
  );
};

export const ModalContainer = () => {
  const { type, showConfirmation, ...rest } = useModal();
  return (
    <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-xl p-10">
      {type === 'CONFIRMATION' ? (
        <ConfirmationModal
          {...(rest as TModalConfirmationProps &
            TModalResponseHandler<'CONFIRMATION'>)}
        />
      ) : type === 'PROMPT' ? (
        <PromptModal
          {...(rest as TModalPromptProps & TModalResponseHandler<'PROMPT'>)}
        />
      ) : type === 'DATAURL_EMBED' ? (
        <DataURLEmbedModal
          {...(rest as TModalDataURLEmbedProps &
            TModalResponseHandler<'DATAURL_EMBED'>)}
        />
      ) : null}
    </div>
  );
};
