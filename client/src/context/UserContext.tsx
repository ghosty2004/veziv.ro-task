import { createContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export const UserContext = createContext<any | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, data } = useQuery(['user'], () =>
    axios
      .post('/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => res.data)
  );

  return !isLoading ? (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  ) : null;
};
