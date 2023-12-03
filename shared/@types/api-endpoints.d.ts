declare module 'shared/api-endpoints' {
  export type ApiEndpoints =
    | {
        path: '/api/auth/login';
        method: 'GET';
        expectedBody: {
          email: string;
          password: string;
        };
      }
    | {
        path: '/api/auth/register';
        method: 'POST';
        expectedBody: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        };
      }
    | {
        path: '/api/users/me';
        method: 'GET';
        expectedBody: {};
      };
}
