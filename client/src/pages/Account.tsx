import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  HorizontalLine,
  Layout,
  UploadFiles,
  UploadedPortfolios,
} from '@/components';
import { useUser } from '@/context';

const Profile = () => (
  <div className="flex flex-col gap-10">
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-3 w-1/2">
        <span>Personal Info</span>
        <span className="text-xs">
          Update your photo and personal details here
        </span>
      </div>
      <div className="flex gap-5 max-md:flex-col">
        <button className="text-violet-400 font-bold bg-white/10 hover:bg-white/20 lg:px-10 rounded-lg max-md:py-1 py-4 max-lg:px-5 max-md:text-xs">
          Cancel
        </button>
        <button className="text-white bg-violet-500 hover:bg-violet-500/80 lg:px-10 rounded-lg max-md:py-1 py-4 max-lg:px-5 max-md:text-xs">
          Save Changes
        </button>
      </div>
    </div>
    <HorizontalLine />

    <div className="flex justify-between items-center">
      <span className="w-[40%] max-md:text-sm">Name</span>
      <div className="flex gap-10 w-[60%]">
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="ghosty"
        />
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="2004"
        />
      </div>
    </div>
    <HorizontalLine />

    <div className="flex justify-between items-center">
      <span className="w-[40%] max-md:text-sm">Email</span>
      <div className="flex gap-10 w-[60%]">
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="example@example.com"
        />
      </div>
    </div>
    <HorizontalLine />

    <div className="flex justify-between items-center">
      <span className="w-[40%] max-md:text-sm">Personal Website</span>
      <div className="flex gap-10 w-[60%]">
        <input
          className="outline-none bg-white/10 p-3 rounded-lg w-full"
          type="text"
          placeholder="example.com"
        />
      </div>
    </div>
    <HorizontalLine />
  </div>
);

const Portfolios = () => {
  const [files, setFiles] = useState(
    Array.from({ length: 30 }).map((_, index) => ({
      name: `name ${index}`,
      website: `website ${index}`,
      visible: length % 2 === 0,
    }))
  );

  const handleItemRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVisibilityToggle = (index: number) => {
    setFiles((prev) =>
      prev.map((file, i) =>
        i === index ? { ...file, visible: !file.visible } : file
      )
    );
  };

  return (
    <div className="flex gap-10 max-lg:flex-col">
      <div className="w-1/2 max-lg:w-full">
        <UploadedPortfolios
          files={files}
          onRemoveItem={handleItemRemove}
          onVisibilityToggle={handleVisibilityToggle}
        />
      </div>
      <div className="w-1/2 max-lg:w-full">
        <UploadFiles />
      </div>
    </div>
  );
};

const Settings = () => null;

type TCurrentSection = 'PROFILE' | 'PORTFOLIOS' | 'SETTINGS';

const AccountSections: Record<string, TCurrentSection> = {
  ['My Profile']: 'PROFILE',
  ['My Portfolios']: 'PORTFOLIOS',
  ['Settings']: 'SETTINGS',
};

export const Account = () => {
  const [currentSection, setCurrentSection] =
    useState<TCurrentSection>('PROFILE');

  const user = useUser();

  const handleSectionChange = (section: TCurrentSection) => () => {
    setCurrentSection(section);
  };

  return !user ? (
    <Navigate to="/login" />
  ) : (
    <Layout title="Your Account">
      <div className="flex flex-col w-full">
        <div className="flex gap-10 cursor-pointer">
          {Object.entries(AccountSections).map(
            ([sectionName, section], index) => (
              <div className="relative" key={index}>
                <span
                  className={`hover:text-violet-400/70 max-lg:text-sm ${
                    currentSection === section ? 'text-violet-500' : ''
                  }`}
                  onClick={handleSectionChange(section)}
                >
                  {sectionName}
                </span>
                {currentSection === section && (
                  <div className="absolute w-full h-[1px] bg-violet-500 my-5" />
                )}
              </div>
            )
          )}
        </div>
        <div className="w-full h-[1px] bg-white/10 my-5" />

        <div className="w-full">
          {currentSection === 'PROFILE' ? (
            <Profile />
          ) : currentSection === 'PORTFOLIOS' ? (
            <Portfolios />
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </Layout>
  );
};
