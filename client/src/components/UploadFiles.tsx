import { API } from '@/api';
import { useState, useEffect, useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';

const FileStatus = {
  ['WAITING']: 'Waiting',
  ['UPLOADING']: 'Uploading',
  ['UPLOADED']: 'Uploaded',
  ['ERROR']: 'Error',
};

export const UploadFiles = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<
    Array<{
      file: File;
      progress: number;
      status: keyof typeof FileStatus;
    }>
  >([]);
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

  const handleFilesSet = (files: File[]) => {
    setFiles((prevState) =>
      prevState.concat(
        files.map((file) => ({
          file,
          progress: 0,
          status: 'WAITING',
        }))
      )
    );
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    lastDragUpdate.current = Date.now();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files) {
      handleFilesSet([...files]);
    }
  };

  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      handleFilesSet([...files]);
    }
  };

  const handleFileRemove = (index: number) => () => {
    setFiles((prevState) => prevState.filter((_, i) => i !== index));
  };

  const setFileStatus = (
    index: number,
    { status, progress }: { status: keyof typeof FileStatus; progress?: number }
  ) => {
    setFiles((prevState) =>
      prevState.map((file, i) =>
        i === index
          ? { ...file, status, progress: progress ?? file.progress }
          : file
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    Promise.all(
      files.map(
        async ({ file: mainFile }, index) =>
          await new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(mainFile);

            reader.onprogress = (event) => {
              if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                setFileStatus(index, {
                  status: 'UPLOADING',
                  progress,
                });
              }
            };

            reader.onload = async () => {
              const dataURL = reader.result;
              if (typeof dataURL !== 'string') {
                setFileStatus(index, {
                  status: 'ERROR',
                });
                resolve();
              } else {
                const { error } = await API.makeRequest(
                  {
                    path: '/api/portfolios',
                    method: 'POST',
                    body: {
                      name: mainFile.name,
                      dataURL: reader.result as string,
                    },
                  },
                  localStorage.getItem('token')
                );
                if (typeof error !== 'undefined') {
                  setFileStatus(index, {
                    status: 'ERROR',
                  });
                } else {
                  setFileStatus(index, {
                    status: 'UPLOADED',
                  });
                }
              }
            };
          })
      )
    );
  };

  return (
    <form
      data-testid="form"
      className="w-full h-[550px] flex flex-col gap-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-3">
        <span className="max-md:text-xl text-3xl text-white font-bold">
          Upload Files
        </span>
        <span className="max-md:text-sm text-lg text-violet-400/90">
          Upload documents your want to share
        </span>
      </div>
      <div className="w-full h-full flex max-md:flex-col gap-10">
        <div
          className="max-md:h-1/4 max-md:w-full w-1/2 custom-dashed-border flex items-center justify-center flex-col gap-5"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FaFileUpload
            className={`w-[40px] h-[40px] ${
              isDragging ? 'text-gray-500/90' : 'text-violet-500/90'
            }`}
          />
          <span
            className={`max-lg:hidden ${
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
        <div className="max-md:w-full w-1/2 flex flex-col gap-4">
          <span className="text-violet-500/90 font-bold text-xl">
            Selected Files
          </span>
          <div className="flex flex-col gap-3 max-md:max-h-[200px] max-h-[300px] overflow-auto scrollbar">
            {files.map(({ file, progress, status }, index) => (
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
                    <p className="text-white w-3/5">
                      {file.name} ({[progress]}%)
                    </p>
                    <p className="text-violet-500/80 font-bold">
                      {FileStatus[status]}
                    </p>
                  </span>
                  <div className="h-1 bg-neutral-600">
                    <div
                      className="h-1 bg-violet-500"
                      style={{ width: `${progress}%` }}
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
