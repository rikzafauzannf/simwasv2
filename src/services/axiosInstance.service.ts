import axiosInstance from '@/middleware/db/axios';

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
  async getDataById(endpoint: string) {
    try {
      const response = await axiosInstance.get(endpoint);
      return {
        success: true,
        data: response.data,
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
}
