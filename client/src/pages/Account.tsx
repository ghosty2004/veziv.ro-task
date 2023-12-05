import { useState, ChangeEvent, useRef, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  HorizontalLine,
  Layout,
  UploadFiles,
  UploadedPortfolios,
} from '@/components';
import { useUser } from '@/context';
import { Portfolio, User } from 'shared/api-entities';
import { API } from '@/api';

const Profile = ({ user }: { user: User }) => {
  const profileRef = useRef<HTMLFormElement>(null);

  const [modifiedParts, setModifiedParts] = useState<
    Record<keyof User, any> | {}
  >({});

  const handleModify =
    (key: keyof User) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setModifiedParts((prev) => ({ ...prev, [key]: value }));
    };

  const isAnythingModified = Object.entries(modifiedParts).length > 0;

  const isModified = (key: keyof User) =>
    // @ts-ignore
    typeof modifiedParts[key] !== 'undefined' ?? false;

  const handleModifyCancel = () => {
    setModifiedParts({});

    if (profileRef.current) {
      profileRef.current.querySelectorAll('input').forEach((input) => {
        input.value = '';
      });
    }
  };

  const handleModifySubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { error } = await API.makeRequest({
      authorize: true,
    })({
      path: '/api/users/me',
      method: 'PATCH',
      body: modifiedParts,
    });

    if (error) return toast(error.message, { type: 'error' });

    toast('Successfully updated your profile!', { type: 'success' });
  };

  return (
    <form
      className="flex flex-col gap-10"
      ref={profileRef}
      onSubmit={handleModifySubmit}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3 w-1/2">
          <span>Personal Info</span>
          <span className="text-xs">Update your personal details here</span>
        </div>
        <div className="flex gap-5 max-md:flex-col">
          <button
            onClick={handleModifyCancel}
            className={`text-indigo-400 font-bold bg-white/10 hover:bg-white/20 lg:px-10 rounded-lg max-md:py-1 py-4 max-lg:px-5 max-md:text-xs disabled:cursor-not-allowed`}
            disabled={!isAnythingModified}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-indigo-500 hover:bg-indigo-500/80 lg:px-10 rounded-lg max-md:py-1 py-4 max-lg:px-5 max-md:text-xs disabled:cursor-not-allowed"
            disabled={!isAnythingModified}
          >
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
            placeholder={!isModified('firstName') ? user.firstName : ''}
            onChange={handleModify('firstName')}
          />
          <input
            className="outline-none bg-white/10 p-3 rounded-lg w-full"
            type="text"
            placeholder={!isModified('lastName') ? user.lastName : ''}
            onChange={handleModify('lastName')}
          />
        </div>
      </div>
      <HorizontalLine />

      <div className="flex justify-between items-center">
        <span className="w-[40%] max-md:text-sm">Email</span>
        <div className="flex gap-10 w-[60%]">
          <input
            className="outline-none bg-white/10 p-3 rounded-lg w-full"
            type="email"
            placeholder={!isModified('email') ? user.email : ''}
            onChange={handleModify('email')}
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
            placeholder={
              !isModified('personalWebsite')
                ? user.personalWebsite ?? 'N/A'
                : ''
            }
            onChange={handleModify('personalWebsite')}
          />
        </div>
      </div>
      <HorizontalLine />
    </form>
  );
};

const Portfolios = ({ user }: { user: User }) => {
  const [files, setFiles] = useState<Portfolio[]>(user.portfolios!);

  const handleItemRemove = async (index: number) => {
    const { error } = await API.makeRequest({
      authorize: true,
    })({
      path: `/api/portfolios/${files[index].id}`,
      method: 'DELETE',
    });

    if (typeof error !== 'undefined')
      return toast(error.message, { type: 'error' });

    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVisibilityToggle = async (index: number) => {
    const { error } = await API.makeRequest({
      authorize: true,
    })({
      path: `/api/portfolios/${files[index].id}`,
      method: 'PATCH',
      body: {
        hidden: !files[index].hidden,
      },
    });

    if (typeof error !== 'undefined')
      return toast(error.message, { type: 'error' });

    setFiles((prev) =>
      prev.map((file, i) =>
        i === index ? { ...file, hidden: !file.hidden } : file
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

type TCurrentSection = 'PROFILE' | 'PORTFOLIOS';

const AccountSections: Record<string, TCurrentSection> = {
  ['My Profile']: 'PROFILE',
  ['My Portfolios']: 'PORTFOLIOS',
};

export const Account = () => {
  const [currentSection, setCurrentSection] =
    useState<TCurrentSection>('PROFILE');

  const user = useUser();

  const handleSectionChange = (section: TCurrentSection) => () => {
    setCurrentSection(section);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
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
                  className={`hover:text-indigo-400/70 max-lg:text-sm ${
                    currentSection === section ? 'text-indigo-500' : ''
                  }`}
                  onClick={handleSectionChange(section)}
                >
                  {sectionName}
                </span>
                {currentSection === section && (
                  <div className="absolute w-full h-[1px] bg-indigo-500 my-5" />
                )}
              </div>
            )
          )}
          <span className="max-lg:text-sm" onClick={handleLogOut}>
            Log out
          </span>
        </div>
        <div className="w-full h-[1px] bg-white/10 my-5" />

        <div className="w-full">
          {currentSection === 'PROFILE' ? (
            <Profile user={user} />
          ) : (
            <Portfolios user={user} />
          )}
        </div>
      </div>
    </Layout>
  );
};
