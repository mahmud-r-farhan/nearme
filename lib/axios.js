import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add interceptor to handle auth token
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('auth-storage'))?.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);