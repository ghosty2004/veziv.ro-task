import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { API } from '@/api';

const UserContext = createContext<any | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, data } = useQuery(['user'], () =>
    API.makeRequest(
      {
        path: '/api/users/me',
        method: 'GET',
      },
      localStorage.getItem('token')
    ).then((res) => res || true)
  );

  return !isLoading ? (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  ) : null;
};

export const useUser = () => useContext(UserContext);
