import { useModal } from '@/context/ModalContext';
import { TModalConfirmationProps, TModalResponseHandler } from '@/types/TModal';

const ConfirmationModal = ({
  title,
  description,
  buttons,
  handleResponse,
}: TModalConfirmationProps & TModalResponseHandler<'CONFIRMATION'>) => (
  <div className="flex flex-col gap-4">
    <span className="text-2xl font-bold">{title}</span>
    <span className="text-lg text-gray-500">{description}</span>
    <div className="flex gap-10">
      {buttons.map(({ type, uniqueId, label }) => (
        <button
          key={uniqueId}
          className={`px-2 py-1 font-bold rounded ${
            type === 'PRIMARY'
              ? 'bg-violet-600 hover:bg-violet-600/90 text-white'
              : 'bg-white hover:bg-white/90 text-violet-500'
          }`}
          onClick={() => {
            handleResponse({
              uniqueId,
            });
          }}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export const ModalContainer = () => {
  const { type, showConfirmation, ...rest } = useModal();
  return (
    <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] bg-black rounded-xl p-10">
      {type === 'CONFIRMATION' ? (
        <ConfirmationModal
          {...(rest as TModalConfirmationProps &
            TModalResponseHandler<'CONFIRMATION'>)}
        />
      ) : null}
    </div>
  );
};
