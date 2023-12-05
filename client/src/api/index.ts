import axios from 'axios';
import type { ApiEndpoints } from 'shared/api-endpoints';

interface IApiRequestData {
  authorize?: boolean;
}

interface IApiResponse<T> {
  response?: T;
  error?: {
    message: string;
    error: string;
    statusCode: number;
  };
}

export class API {
  static makeRequest<Response = any>(requestData?: IApiRequestData) {
    return async <T extends ApiEndpoints>(
      endpoint: Partial<T>
    ): Promise<IApiResponse<Response>> => {
      const { path: url, method, body: data, query } = endpoint;

      if (requestData?.authorize) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${localStorage.getItem('token')}`;
      }

      let queryParameters = '';

      if (typeof url !== 'undefined' && typeof query !== 'undefined') {
        const queryKeys = Object.keys(query);
        const queryValues = Object.values(query);
        const queryArray = queryKeys.map(
          (key, index) => `${key}=${queryValues[index]}`
        );
        const queryString = queryArray.join('&');
        queryParameters = `?${queryString}`;
      }

      try {
        const response = await axios({
          url: url + queryParameters,
          method,
          data,
        });

        return { response: response.data };
      } catch (e: any) {
        return {
          error: e.response.data,
        };
      }
    };
  }
}
