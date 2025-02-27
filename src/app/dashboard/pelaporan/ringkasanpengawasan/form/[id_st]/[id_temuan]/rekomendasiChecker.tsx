import { CardComponents } from '@/app/components/Global/Card';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNameKode } from '@/hooks/useGetName';
import { RekomendasiData, TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { AxiosService } from '@/services/axiosInstance.service';
import Swal from 'sweetalert2';
import React from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';

interface propsID {
  RekomendasiData: RekomendasiData[];
  refetchData: any;
}

const axiosService = new AxiosService();

const RekomendasiChecker: React.FC<propsID> = ({ RekomendasiData, refetchData }) => {
  const { getNameKodeRekomendasi, getNameKodeTemuan, getFieldKodeRekomendasi } = useGetNameKode();

  const handleDelete = async (id_tlhp: number) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Penghapusan',
      text: 'Apakah Anda yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosService.deleteData(
          `/temuan_hasil/${id_tlhp}`
        );
        if (response.success) {
          Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
        } else {
          throw new Error(response.message);
        }
        refetchData();
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3>Data Rekomendasi ({RekomendasiData.length})</h3>
      {RekomendasiData.map((item) => (
        <CardComponents key={item.id_tlhp}>
          <small>
            tanggal dibuat -{' '}
            <span className="font-semibold">
              {formatToLocalDate(item.created)}
            </span>
          </small>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-dark">
            <div>
              <small>Kode Rekomendasi</small>
              <h3>{getNameKodeRekomendasi(item.id_kode_rekomendasi)}</h3>
              <small>{getFieldKodeRekomendasi(item.id_kode_rekomendasi)}</small>
            </div>
            <div>
              <small>Nilai Rekomendasi</small>
              <h3>{formatCurrency(item.rekomendasi_nilai)}</h3>
            </div>

            <div>
              <small>Rekomendasi/Saran</small>
              <h3>{item.rekomendasi_saran}</h3>
            </div>
            <div className="md:col-span-2 lg:col-span-3">            
                <Button
                  onClick={() => handleDelete(item.id_tlhp)}
                  className="shadow-md bg-red-600 hover:bg-red-700  font-semibold hover:font-bold rounded-md text-white"
                >
                  Delete
                </Button>
            </div>
          </div>
        </CardComponents>
      ))}
    </div>
  );
};

export default RekomendasiChecker;
