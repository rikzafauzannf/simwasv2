import { CardComponents } from '@/app/components/Global/Card';
import { formatCurrency } from '@/data/formatData';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNameKode } from '@/hooks/useGetName';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { AxiosService } from '@/services/axiosInstance.service';
import React from 'react';

interface propsID {
  id_st: number;
}

const axiosSecvice = new AxiosService()

const TemuanChecker: React.FC<propsID> = ({ id_st }) => {
  const { data: DataTemuanHasil,refetch } =
    useFetchAll<TemuanHasilData>('temuan_hasil');
  const TemuanFilterID = DataTemuanHasil.filter(
    (item) => item.id_st === Number(id_st)
  );
  const { getNameKodeRekomendasi, getNameKodeTemuan } = useGetNameKode();
  return (
    <div className="space-y-3">
      <h3>Data Temuan ({TemuanFilterID.length})</h3>
      {TemuanFilterID.map((item, index) => (
        <CardComponents key={index}>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <small>Kode Temuan</small>
              <p>{getNameKodeTemuan(item.id_kode_temuan)}</p>
            </div>
            <div className="col-span-2">
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
            <div className='col-span-3'>
                <small>Uraian, Audit, Nomor dan Tgl LHP</small>
                <h3>{item.uraian}</h3>
            </div>
            <div className='col-span-3'>
              <button className='w-full bg-red-700 hover:bg-red-500'>Delete</button>
            </div>
          </div>
        </CardComponents>
      ))}
    </div>
  );
};

export default TemuanChecker;
