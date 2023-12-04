import axios from 'axios';
import type { ApiEndpoints } from 'shared/api-endpoints';

interface IApiResponse {
  response?: any;
  error?: {
    message: string;
    error: string;
    statusCode: number;
  };
}

export class API {
  static async makeRequest<T extends ApiEndpoints>(
    endpoint: Partial<T>,
    token?: string | null
  ): Promise<IApiResponse> {
    const { path: url, method, body: data } = endpoint;

    const headers =
      typeof token === 'string' ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await axios({
        url,
        method,
        data,
        headers,
      });

      return { response: response.data };
    } catch (e: any) {
      return {
        error: e.response.data,
      };
    }
  }
}
