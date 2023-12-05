declare module 'shared/api-endpoints' {
  import { Portfolio, User } from 'shared/api-entities';

  export type ApiEndpoints =
    | {
        path: '/api/auth/login';
        method: 'POST';
        body: {
          email: string;
          password: string;
        };
        query: {};
      }
    | {
        path: '/api/auth/register';
        method: 'POST';
        body: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        };
        query: {};
      }
    | {
        path: '/api/users';
        method: 'GET';
        body: {};
        query: {
          id?: number;
          limit?: number;
          name?: string;
          email?: string;
        };
      }
    | {
        path: '/api/users/me';
        method: 'GET';
        body: {};
        query: {};
      }
    | {
        path: '/api/users/me';
        method: 'PATCH';
        body: Partial<User>;
        query: {};
      }
    | {
        path: '/api/portfolios';
        method: 'POST';
        body: Partial<Portfolio>;
        query: {};
      }
    | {
        path: `/api/portfolios/${string}`;
        method: 'PATCH';
        body: Partial<Portfolio>;
        query: {};
      }
    | {
        path: `/api/portfolios/${string}`;
        method: 'DELETE';
        body: {};
        query: {};
      };
}
