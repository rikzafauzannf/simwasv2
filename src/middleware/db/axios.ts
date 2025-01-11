import axios, { AxiosInstance } from 'axios';

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
    // 'Authorization': `Bearer ${process.env.NEXT_SECRET_API_TOKEN}`,
  },
});

// Interceptor untuk menambahkan Authorization jika dibutuhkan
axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_SECRET_API_TOKEN;
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
