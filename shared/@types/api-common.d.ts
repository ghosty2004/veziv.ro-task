declare module 'shared/api-common' {
  export interface ApiEndpoint {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    idk: boolean;
  }

  export interface ApiRequest<T = any> {
    body?: T;
    query?: any;
    params?: any;
    headers?: any;
  }

  export interface ApiResponse<T = any> {
    error?: string;
    message?: string;
    data?: T;
  }
}
