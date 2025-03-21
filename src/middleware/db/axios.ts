import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '../Store/useAuthStore';

// Validasi bahwa API endpoint tersedia
const apiEndpoint = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiEndpoint) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL is not defined in environment variables.'
  );
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiEndpoint,
  timeout: 10000, // Waktu tunggu dalam milidetik
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan Authorization jika dibutuhkan
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore.getState();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Menangani respons dan kesalahan secara global
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data || error.message || 'An unknown error occurred';
    return Promise.reject(message);
  }
);

export default axiosInstance;
