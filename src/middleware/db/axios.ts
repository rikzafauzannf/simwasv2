import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000, // Waktu tunggu dalam milidetik
    headers: {
        'Content-Type': 'application/json',
        // Tambahkan header lain jika diperlukan
    },
});

// Menangani respons dan kesalahan secara global
axiosInstance.interceptors.response.use(
    response => {
        // Mengembalikan respons yang berhasil
        return response.data;
    },
    error => {
        // Menangani kesalahan
        return Promise.reject(error.response ? error.response.data : error.message);
    }
);

export default axiosInstance;