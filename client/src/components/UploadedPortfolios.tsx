import { useModal } from '@/context';
import { MdDelete, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Portfolio } from 'shared/api-entities';

interface IProps {
  files: Portfolio[];
  onRemoveItem: (index: number) => void;
  onVisibilityToggle: (index: number) => void;
}

export const UploadedPortfolios = ({
  files,
  onRemoveItem,
  onVisibilityToggle,
}: IProps) => {
  const { showConfirmation } = useModal();

  const handleOnRemove = (index: number) => async () => {
    try {
      const { responseUniqueIdButton } = await showConfirmation({
        title: 'Are you sure ?',
        description: `Do you want to delete ${files[index].name} ?\nThis action is irreversible.`,
        buttons: [
          {
            type: 'SECONDARY',
            uniqueId: 'cancel',
            label: 'Cancel',
          },
          {
            type: 'PRIMARY',
            uniqueId: 'delete',
            label: 'Delete',
          },
        ],
      });

      if (responseUniqueIdButton === 'delete') {
        onRemoveItem(index);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleVisibilityToggle = (index: number) => () => {
    onVisibilityToggle(index);
  };

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex flex-col items-start gap-3">
        <span className="max-md:text-xl text-3xl text-white font-bold">
          Your uploaded portfolios
        </span>
        <span className="max-md:text-sm text-lg text-indigo-400/90">
          Here are your portfolios that you have uploaded
        </span>
      </div>
      <div className="w-full">
        <table className="w-full border-separate border-spacing-2 max-md:text-xs">
          <thead className="table w-full table-fixed">
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Name</th>
              <th className="text-left">Website</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="max-h-[300px] overflow-auto scrollbar block">
            {files.map(({ id, name, website, hidden }, index) => (
              <tr
                data-testid="item"
                key={id}
                className="table w-full table-fixed overflow-hidden"
              >
                <td>{id}</td>
                <td>{name}</td>
                <td>{website ?? 'none'}</td>
                <td className="flex max-2xl:flex-col max-lg:justify-around gap-1 2xl:w-[180px]">
                  <button
                    className="flex items-center justify-center gap-1 text-white bg-red-500 hover:bg-red-500/80 p-[2px] rounded-lg text-center"
                    onClick={handleOnRemove(index)}
                  >
                    <MdDelete />
                    <span className="max-md:text-[10px]">Remove</span>
                  </button>
                  <button
                    className={`flex items-center justify-center gap-1 text-white p-[2px] rounded-lg bg-gray-700 hover:bg-gray-700/80 2xl:w-[80px]`}
                    onClick={handleVisibilityToggle(index)}
                  >
                    {hidden ? <MdVisibility /> : <MdVisibilityOff />}
                    <span
                      className={`max-md:text-[10px] font-bold ${
                        hidden ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {!hidden ? 'Private' : 'Public'}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
