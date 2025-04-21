import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY || '';

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const appendApiKey = (url: string, apiKey: string): string => {
  if (!apiKey) {
    return url;
  }
  
  return `${url}?format=json-cors&key=${apiKey}`;
};

const handleError = (error: AxiosError): never => {
  console.error(error.response?.data || error.message);
  throw error;
};

export const createHttpService = (baseURL: string, apiKey: string = API_KEY) => {
  const axiosInstance = createAxiosInstance(baseURL);

  return {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const urlWithKey = appendApiKey(url, apiKey);
        const response: AxiosResponse<T> = await axiosInstance.get(urlWithKey, config);
        return response.data;
      } catch (error) {
        return handleError(error as AxiosError);
      }
    },

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
      try {
        const urlWithKey = appendApiKey(url, apiKey);
        const response: AxiosResponse<T> = await axiosInstance.post(urlWithKey, data, config);
        return response.data;
      } catch (error) {
        return handleError(error as AxiosError);
      }
    },

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
      try {
        const urlWithKey = appendApiKey(url, apiKey);
        const response: AxiosResponse<T> = await axiosInstance.put(urlWithKey, data, config);
        return response.data;
      } catch (error) {
        return handleError(error as AxiosError);
      }
    },

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const urlWithKey = appendApiKey(url, apiKey);
        const response: AxiosResponse<T> = await axiosInstance.delete(urlWithKey, config);
        return response.data;
      } catch (error) {
        return handleError(error as AxiosError);
      }
    }
  };
};

const financeApi = createHttpService('https://api.hgbrasil.com');

export default financeApi;