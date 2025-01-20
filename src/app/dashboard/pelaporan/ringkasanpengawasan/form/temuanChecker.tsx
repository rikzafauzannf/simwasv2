import { CardComponents } from '@/app/components/Global/Card';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNameKode } from '@/hooks/useGetName';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { AxiosService } from '@/services/axiosInstance.service';
import Swal from 'sweetalert2';
import React from 'react';

interface propsID {
  id_st: number;
}

const axiosService = new AxiosService();

const TemuanChecker: React.FC<propsID> = ({ id_st }) => {
  const { data: DataTemuanHasil, refetch } =
    useFetchAll<TemuanHasilData>('temuan_hasil');
  const TemuanFilterID = DataTemuanHasil.filter(
    (item) => item.id_st === Number(id_st)
  );
  const { getNameKodeRekomendasi, getNameKodeTemuan } = useGetNameKode();

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
          refetch(); // Refresh data setelah penghapusan
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3>Data Temuan ({TemuanFilterID.length})</h3>
      {TemuanFilterID.map((item) => (
        <CardComponents key={item.id_tlhp}>
          <small>
            tanggal dibuat -{' '}
            <span className="font-semibold">
              {formatToLocalDate(item.created_at)}
            </span>
          </small>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <small>Kode Temuan</small>
              <p>{getNameKodeTemuan(item.id_kode_temuan)}</p>
            </div>
            <div className="lg:col-span-2">
              <small>Kondisi Temuan</small>
              <h3>{item.kondisi_temuan}</h3>
            </div>
            <div>
              <small>Kode Rekomendasi</small>
              <p>{getNameKodeRekomendasi(item.id_kode_rekomendasi)}</p>
            </div>
            <div>
              <small>Nilai rekomendasi</small>
              <h3>{formatCurrency(item.nilai_rekomendasi)}</h3>
            </div>
            <div>
              <small>Rekomendasi/Saran</small>
              <h3>{item.rekomendasi_saran}</h3>
            </div>
            <div className="lg:col-span-3">
              <small>Uraian, Audit, Nomor dan Tgl LHP</small>
              <h3>{item.uraian}</h3>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <button
                onClick={() => handleDelete(item.id_tlhp)}
                className="w-full shadow-md bg-red-800 hover:bg-red-600 p-3 font-semibold hover:font-bold rounded-md text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </CardComponents>
      ))}
    </div>
  );
};

export default TemuanChecker;
