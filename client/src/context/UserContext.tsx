import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { API } from '@/api';
import type { User } from 'shared/api-entities';

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, data } = useQuery(['user'], () =>
    API.makeRequest(
      {
        path: '/api/users/me',
        method: 'GET',
      },
      localStorage.getItem('token')
    ).then((res) => res)
  );

  return !isLoading ? (
    <UserContext.Provider value={data?.response}>
      {children}
    </UserContext.Provider>
  ) : null;
};

export const useUser = () => useContext(UserContext);
