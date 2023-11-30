import { MdDelete } from 'react-icons/md';

interface IProps {
  files: Array<{
    name: string;
    website: string | null;
  }>;
  onRemove?: (index: number) => () => void;
}

export const UploadedPortfolios = ({ files }: IProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex flex-col items-start gap-3">
        <span className="text-3xl text-white font-bold">
          Your uploaded portfolios
        </span>
        <span className="text-lg text-violet-400/90">
          Here are your portfolios that you have uploaded
        </span>
      </div>
      <div className="w-full">
        <table className="w-full border-separate border-spacing-2">
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
              <tr key={index} className="table w-full table-fixed">
                <td>{index}</td>
                <td>{name}</td>
                <td>{website}</td>
                <td>
                  <button className="flex items-center gap-1 text-white bg-violet-500 hover:bg-violet-500/80 px-2 py-1 rounded-lg text-sm">
                    <MdDelete />
                    <span>Remove</span>
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
