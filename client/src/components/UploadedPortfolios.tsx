import { useModal } from '@/context';
import { MdDelete } from 'react-icons/md';

interface IProps {
  files: Array<{
    name: string;
    website: string | null;
  }>;
  onRemoveItem: (index: number) => void;
}

export const UploadedPortfolios = ({ files, onRemoveItem }: IProps) => {
  const { showConfirmation } = useModal();

  const handleOnRemove = (index: number) => async () => {
    try {
      const modalResponse = await showConfirmation({
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

      if (modalResponse.uniqueId === 'delete') {
        console.log(true);
        onRemoveItem(index);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex flex-col items-start gap-3">
        <span className="max-md:text-xl text-3xl text-white font-bold">
          Your uploaded portfolios
        </span>
        <span className="max-md:text-sm text-lg text-violet-400/90">
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
            {files.map(({ name, website }, index) => (
              <tr
                data-testid="item"
                key={index}
                className="table w-full table-fixed"
              >
                <td>{index}</td>
                <td>{name}</td>
                <td>{website}</td>
                <td>
                  <button
                    className="flex items-center gap-1 text-white bg-violet-500 hover:bg-violet-500/80 px-2 py-1 rounded-lg"
                    onClick={handleOnRemove(index)}
                  >
                    <MdDelete />
                    <span className="max-md:hidden max-xl:text-xs">Remove</span>
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
