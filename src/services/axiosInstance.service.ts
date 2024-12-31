import axiosInstance from '@/middleware/db/axios';
import { AxiosResponse } from 'axios';

export interface VerifyOtpResponse {
  success: boolean;
  data?: {
      user: { id_user: number; nip: string };
      token: string;
  };
  message: string;
  error?: string;
}

export class AxiosService {
  // Mengambil semua data dari endpoint
  async getAllData(endpoint: string) {
    try {
      const response = await axiosInstance.get(endpoint);
      return {
        success: true,
        data: response,
        message: 'Data berhasil diambil',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengambil data',
      };
    }
  }

  // Menambah data ke endpoint
  async addData(endpoint: string, data: any) {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return {
        success: true,
        data: response,
        message: 'Data berhasil ditambahkan',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal menambahkan data',
      };
    }
  }

  // Update data di endpoint
  async updateData(endpoint: string, data: any) {
    try {
      const response = await axiosInstance.put(endpoint, data);
      return {
        success: true,
        data: response,
        message: 'Data berhasil diupdate',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengupdate data',
      };
    }
  }

  // Hapus data di endpoint
  async deleteData(endpoint: string) {
    try {
      const response = await axiosInstance.delete(endpoint);
      return {
        success: true,
        data: response,
        message: 'Data berhasil dihapus',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal menghapus data',
      };
    }
  }

  // Mengambil data spesifik berdasarkan ID
  async getDataById(endpoint: string, id: number) {
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      return {
        success: true,
        data: response,
        message: 'Data berhasil diambil',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengambil data',
      };
    }
  }

  async verifyOtp(data: { nip: string; otp: string }): Promise<VerifyOtpResponse> {
    try {
      const response: AxiosResponse<VerifyOtpResponse> = await axiosInstance.post('verify-otp', data);

      // Simpan data ke localStorage jika berhasil
      if (response.data?.success && response.data.data) {
        localStorage.setItem(
          'userData',
          JSON.stringify({
            user: response.data.data.user,
            token: response.data.data.token,
          })
        );
      }

      // Kembalikan response yang terdefinisi dengan tipe yang jelas
      return {
        success: response.data?.success || false,
        data: response.data?.data,
        message: response.data?.message || 'Tidak ada pesan dari server',
      };
    } catch (error: any) {
      // Tangkap error dengan tipe yang lebih aman
      const errorMessage = error?.response?.data?.message || error.message || 'Terjadi kesalahan tidak diketahui';
      return {
        success: false,
        error: errorMessage,
        message: 'Gagal memverifikasi OTP',
      };
    }
  }
}
