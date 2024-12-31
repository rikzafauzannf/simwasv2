'use client';
import React from 'react';
import { CardComponents } from '../Global/Card';
import { useFetchAll } from '@/hooks/useFetchAll';
import { LaporanMingguan } from '@/interface/interfaceKendaliMutu';
import { useGetNameUser } from '@/hooks/useGetName';

interface PropsID {
  id_pkpt: number;
}

const LaporanMingguanComponent = ({ id_pkpt }: PropsID) => {
  const {
    data: DataLaporanMingguan,
    isLoading,
    error,
    refetch,
  } = useFetchAll<LaporanMingguan>('/laporan_mingguan');

  console.log("id_pkpt data: ",id_pkpt)
  console.log("Data: ",DataLaporanMingguan)

  const {getNameUser} = useGetNameUser()

  const dataLaporanMaps = DataLaporanMingguan.filter(
    (data) => data.id_pkpt === Number(id_pkpt)
  );

  console.log('data Laporan Maps: ', dataLaporanMaps);

  return (
    <CardComponents>
      <h3>Rekap Laporan Mingguan</h3>
      <section className="grid w-full gap-3">
        {dataLaporanMaps.map((item) => (
          <div
            key={item.id}
            className="space-y-2 p-3 rounded-md shadow-md hover:bg-slate-500/35 hover:text-black"
          >
            <p>
              {/* {item.jam} , {item.tanggal} - <strong>{item.username}</strong>{' '} */}
              {item.id_no} - <strong>{getNameUser(Number(item.id_user))}</strong>
            </p>
            <p className="text-slate-800">{item.laporan_mingguan}</p>
            <hr />
          </div>
        ))}
      </section>
    </CardComponents>
  );
};

export default LaporanMingguanComponent;
