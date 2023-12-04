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
      }
    | {
        path: '/api/users/me';
        method: 'GET';
        body: {};
      }
    | {
        path: '/api/users/me';
        method: 'PATCH';
        body: Partial<User>;
      }
    | {
        path: '/api/portfolios';
        method: 'POST';
        body: Partial<Portfolio>;
      }
    | {
        path: `/api/portfolios/${string}`;
        method: 'PATCH';
        body: Partial<Portfolio>;
      }
    | {
        path: `/api/portfolios/${string}`;
        method: 'DELETE';
        body: {};
      };
}
