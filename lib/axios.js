import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});