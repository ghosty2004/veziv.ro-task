import { FaFileUpload } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa6';

export const UploadFile = () => (
  <div className="w-[800px] h-[500px] flex flex-col gap-10 bg-black/90 rounded shadow-lg shadow-black p-10">
    <div className="flex flex-col items-start gap-3">
      <span className="text-3xl text-violet-500 font-bold">Upload File</span>
      <span className="text-lg text-violet-400/90">
        Upload documents your want to share
      </span>
    </div>
    <div className="w-full h-full flex gap-10">
      <div className="w-1/2 custom-dashed-border flex items-center justify-center flex-col gap-5">
        <FaFileUpload className="w-[40px] h-[40px] text-violet-500/90" />
        <span className="text-violet-500/90 font-semibold text-lg text-center">
          <p>Drag and drop files here</p>
          <p>- OR -</p>
        </span>
        <button className="bg-violet-800 hover:bg-violet-800/80 px-4 py-1 rounded">
          Browse Files
        </button>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <span className="text-violet-500/90 font-bold text-xl">
          Uploaded Files
        </span>
        <div className="flex flex-col gap-3 max-h-[250px] overflow-auto scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-4 w-full bg-white/5 p-3 rounded-lg"
            >
              <FaFilePdf className="text-violet-500 w-[30px] h-[30px]" />
              <div className="flex gap-1 flex-col h-full w-full">
                <span className="flex font-semibold text-sm justify-between">
                  <p className="text-violet-500">file-name (50%)</p>
                  <p className="text-violet-500/80 font-bold">Completed</p>
                </span>
                <div className="h-1 bg-neutral-600">
                  <div
                    className="h-1 bg-violet-500"
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
