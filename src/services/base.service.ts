import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://[YOUR_PROJECT_ID].mockapi.io/api/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export class BaseApiService {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async get<T>(path: string = '', config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.get(`${this.endpoint}${path}`, config);
    return response.data;
  }

  protected async post<T>(path: string = '', data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.post(`${this.endpoint}${path}`, data, config);
    return response.data;
  }

  protected async put<T>(path: string = '', data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.put(`${this.endpoint}${path}`, data, config);
    return response.data;
  }

  protected async patch<T>(path: string = '', data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.patch(`${this.endpoint}${path}`, data, config);
    return response.data;
  }

  protected async delete<T>(path: string = '', config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.delete(`${this.endpoint}${path}`, config);
    return response.data;
  }
}

export { apiClient };