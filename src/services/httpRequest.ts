import axios, { type AxiosResponse } from 'axios';

export const httpMethods = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
} as const;

export type HttpMethod = (typeof httpMethods)[keyof typeof httpMethods];

interface HttpRequestProps<T = unknown, U = unknown> {
  url: string;
  method: HttpMethod;
  options?: T;
  payload?: U;
  params?: Record<string, unknown>;
}

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    Accept: 'application/json, text/plain',
  },
});

const httpRequest = async <R, T = unknown, U = unknown>({
  url = '',
  method = httpMethods.get,
  options,
  payload,
  params,
}: HttpRequestProps<T, U>): Promise<R> => {
  return await api({
    ...(options as object),
    url,
    method,
    data: payload,
    params,
  })
    .then((response: AxiosResponse<R>) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export { httpRequest };
