import axios from 'axios';
import type { ApiEndpoints } from 'shared/api-endpoints';

export class API {
  static async makeRequest<T extends ApiEndpoints>(
    endpoint: Partial<T>,
    token?: string | null
  ): Promise<any> {
    const { path: url, method, expectedBody: data } = endpoint;

    const headers =
      typeof token === 'string' ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await axios({
        url,
        method,
        data,
        headers,
      });

      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
