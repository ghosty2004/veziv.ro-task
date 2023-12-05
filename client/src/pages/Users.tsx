import { useEffect, useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoIosSearch } from 'react-icons/io';
import { RiUserSearchFill, RiUserFill } from 'react-icons/ri';
import { BiLogoInternetExplorer } from 'react-icons/bi';
import { GiClick } from 'react-icons/gi';
import { FaList, FaInfo } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { User } from 'shared/api-entities';
import { Layout } from '@/components';
import { API } from '@/api';
import { useQuery } from '@/hooks';
import { useModal } from '@/context';

const UserInfo = ({ id }: { id: number }) => {
  const [user, setUser] = useState<User | undefined | null>(null);
  const { showConfirmation, showDataURLEmbed } = useModal();

  useEffect(() => {
    (async () => {
      const { response } = await API.makeRequest<User>()({
        path: '/api/users',
        method: 'GET',
        query: {
          id,
        },
      });

      setUser(response);
    })();
  }, []);

  const handleWebsiteVisit =
    (websiteUrl: User['personalWebsite']) => async () => {
      if (websiteUrl === null) return;

      const { responseUniqueIdButton } = await showConfirmation({
        title: 'You are about to visit an external website',
        description: `Are you sure that you want to visit ${websiteUrl}?`,
        buttons: [
          {
            type: 'PRIMARY',
            uniqueId: 'yes',
            label: 'Yes',
          },
          {
            type: 'SECONDARY',
            uniqueId: 'no',
            label: 'No',
          },
        ],
      });

      if (responseUniqueIdButton === 'no') return;
      window.open(websiteUrl, '_blank');
    };

  const handleViewPortfolio = (dataURL: string) => () => {
    showDataURLEmbed({
      title: 'Portfolio preview',
      description: 'This is the portfolio that the user has uploaded',
      buttons: [
        {
          type: 'PRIMARY',
          uniqueId: 'close',
          label: 'Close',
        },
      ],
      dataURL,
    });
  };

  return typeof user === 'undefined' ? (
    <Navigate to="/users" />
  ) : (
    user && (
      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-bold mb-5">
            <FaInfo />
            <p className="text-2xl">User info</p>
          </span>
          <div className="bg-indigo-500/90 rounded-lg p-5">
            <p className="text-lg flex items-center gap-1 font-bold">
              <RiUserFill className="text-sm" />
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm flex items-center gap-1">
              <MdEmail className="text-sm" />
              {user.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg p-1">
          <span className="flex items-center gap-2 font-bold mb-5">
            <FaList />
            <p className="text-2xl">
              Public portfolio entries ({user.portfolios?.length || 0})
            </p>
          </span>
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-4">
            {user.portfolios?.map((portfolio) => (
              <div
                key={portfolio.id}
                className="flex flex-col bg-white/5 rounded-lg p-2"
              >
                <p className="text-lg flex justify-center gap-1 font-bold">
                  {portfolio.name}
                </p>

                <div className="flex flex-col gap-3 pt-20">
                  <button
                    className="md:text-xl flex bg-indigo-500 hover:bg-indigo-500/80 p-1 rounded-lg items-center gap-1"
                    disabled={portfolio.website === null}
                    onClick={handleWebsiteVisit(portfolio.website)}
                  >
                    <BiLogoInternetExplorer />
                    Visit website
                  </button>
                  <button
                    className="md:text-xl flex bg-indigo-500 hover:bg-indigo-500/80 p-1 rounded-lg items-center gap-1"
                    onClick={handleViewPortfolio(portfolio.dataURL)}
                  >
                    <GiClick />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export const Users = () => {
  const [users, setUsers] = useState<Exclude<User, 'portfolios'>[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const query = useQuery();
  const userId = query.get('id');

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setUsers([]);

    if (!searchInput.length) return;

    const { error, response } = await API.makeRequest<User[]>()({
      path: '/api/users',
      method: 'GET',
      query: {
        limit: 10,
        name: searchInput,
        email: searchInput,
      },
    });

    if (error)
      return toast(error.message, {
        type: 'error',
      });

    if (!response?.length)
      return toast('No users found on your search criteria', { type: 'info' });

    setUsers(response);
  };

  return (
    <Layout title={userId ? 'User info' : 'Users'}>
      <div className="flex flex-col bg-white/5 w-full rounded p-3">
        {!userId ? (
          <div className="flex flex-col items-center justify-center gap-10 xl:p-28 p-5">
            <span className="max-md:text-xl text-3xl font-bold flex items-center gap-2">
              <RiUserSearchFill />
              <p>Search for an user</p>
            </span>
            <form
              className="flex w-full relative"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="outline-none bg-white/10 p-3 rounded-lg w-full pr-14 border border-indigo-500/50 focus:border-indigo-500"
                type="text"
                placeholder="Please enter an user's name or email"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                required
              />
              <button type="submit">
                <IoIosSearch className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white/60 hover:text-indigo-500 text-2xl cursor-pointer" />
              </button>
            </form>

            <div className="flex flex-col gap-5 w-full">
              {users.map((user) => (
                <Link
                  key={user.id}
                  className="flex flex-col bg-indigo-500/70 hover:bg-indigo-500/80 cursor-pointer rounded-lg p-5"
                  to={`/users?id=${user.id}`}
                >
                  <p className="text-lg flex items-center gap-1 font-bold">
                    <RiUserFill className="text-sm" />
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm flex items-center gap-1">
                    <MdEmail className="text-sm" />
                    {user.email}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <UserInfo id={Number(userId)} />
        )}
      </div>
    </Layout>
  );
};
