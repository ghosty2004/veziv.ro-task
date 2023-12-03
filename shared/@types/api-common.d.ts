declare module 'shared/api-common' {
  export interface ApiResponse<T = any> {
    error?: string;
    message?: string;
    data?: T;
  }
}
