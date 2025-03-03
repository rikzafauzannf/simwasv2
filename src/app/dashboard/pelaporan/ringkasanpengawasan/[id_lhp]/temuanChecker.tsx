import { CardComponents } from '@/app/components/Global/Card';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNameKode } from '@/hooks/useGetName';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { AxiosService } from '@/services/axiosInstance.service';
import Swal from 'sweetalert2';
import React from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';

interface propsID {
  DataTemuanHasil: TemuanHasilData[];
  refetchData: any;
}

const axiosService = new AxiosService();

const TemuanChecker: React.FC<propsID> = ({ DataTemuanHasil, refetchData }) => {
  const { getNameKodeRekomendasi, getNameKodeTemuan, getFieldKodeTemuan } =
    useGetNameKode();

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
      <h3>Data Temuan ({DataTemuanHasil.length})</h3>
      <section className="grid md:grid-cols-1 gap-3">
        {DataTemuanHasil.map((item) => (
          <CardComponents key={item.id_tlhp}>
            <small>
              tanggal dibuat -{' '}
              <span className="font-semibold">
                {formatToLocalDate(item.created_at)}
              </span>
            </small>
            <div className="grid md:grid-cols-2 gap-3 text-dark">
              <div>
                <small>Kode Temuan</small>
                <h3>{getNameKodeTemuan(item.id_kode_temuan)}</h3>
                <small>{getFieldKodeTemuan(item.id_kode_temuan)}</small>
              </div>
              <div>
                <small>Kondisi Temuan</small>
                <h3>{item.kondisi_temuan}</h3>
              </div>

              {/* <div>
              <small>Uraian, Audit, Nomor dan Tgl LHP</small>
              <h3>{item.uraian}</h3>
            </div> */}
              <div className="md:col-span-2 lg:col-span-3">
                <section className="flex justify-start items-start w-full gap-2">
                  <Button
                    as={Link}
                    href={`${item.id_st}/${item.id_tlhp}`}
                    className="shadow-md bg-blue-600 hover:bg-blue-700  font-semibold hover:font-bold rounded-md text-white flex-1"
                  >
                    Buat Rekomendasi
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id_tlhp)}
                    className="shadow-md bg-red-600 hover:bg-red-700  font-semibold hover:font-bold rounded-md text-white"
                  >
                    Delete
                  </Button>
                </section>
              </div>
            </div>
          </CardComponents>
        ))}
      </section>
    </div>
  );
};

export default TemuanChecker;
