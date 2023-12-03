import { createContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { API } from '@/api';

export const UserContext = createContext<any | null>(null);

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
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  ) : null;
};
