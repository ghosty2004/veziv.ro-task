import { useState, useEffect, useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';

export const UploadFiles = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const lastDragUpdate = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastDragUpdate.current > 100) {
        setIsDragging(false);
      } else {
        setIsDragging(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    lastDragUpdate.current = Date.now();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files) {
      setFiles((prevState) => [...prevState, ...files]);
    }
  };

  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFiles((prevState) => [...prevState, ...files]);
    }
  };

  const handleFileRemove = (index: number) => () => {
    setFiles((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form
      className="w-full h-[550px] flex flex-col gap-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-3">
        <span className="text-3xl text-white font-bold">Upload Files</span>
        <span className="text-lg text-violet-400/90">
          Upload documents your want to share
        </span>
      </div>
      <div className="w-full h-full flex gap-10">
        <div
          className="w-1/2 custom-dashed-border flex items-center justify-center flex-col gap-5"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FaFileUpload
            className={`w-[40px] h-[40px] ${
              isDragging ? 'text-gray-500/90' : 'text-violet-500/90'
            }`}
          />
          <span
            className={`${
              isDragging ? 'text-gray-500' : 'text-violet-500/90'
            } font-semibold text-lg text-center`}
          >
            <p>Drag and drop files here</p>
            <p>- OR -</p>
          </span>

          <label
            htmlFor="file-upload"
            className={`${
              isDragging
                ? 'hidden'
                : 'bg-violet-800 hover:bg-violet-800/80 px-4 py-1 rounded-lg cursor-pointer'
            }`}
          >
            Browse Files
          </label>
          <input
            id="file-upload"
            onChange={handleFilesUpload}
            type="file"
            multiple
            className="hidden"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <span className="text-violet-500/90 font-bold text-xl">
            Selected Files
          </span>
          <div className="flex flex-col gap-3 max-h-[250px] overflow-auto scrollbar">
            {files.map(({ name }, index) => (
              <div
                key={index}
                className="relative flex gap-4 w-full bg-white/5 px-2 py-4 rounded-lg"
              >
                <div
                  className="absolute top-0 right-0 group"
                  onClick={handleFileRemove(index)}
                >
                  <IoMdCloseCircle className="text-white w-[20px] h-[20px] group-hover:text-red-400" />
                </div>
                <FaFilePdf className="text-violet-500 w-[30px] h-[30px]" />
                <div className="flex gap-1 flex-col h-full w-full">
                  <span className="flex font-semibold text-sm justify-between">
                    <p className="text-white">{name} (0%)</p>
                    <p className="text-violet-500/80 font-bold">Waiting</p>
                  </span>
                  <div className="h-1 bg-neutral-600">
                    <div
                      className="h-1 bg-violet-500"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-violet-500 hover:bg-violet-500/90 p-1 rounded-lg"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};
