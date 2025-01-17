import { CardComponents } from '@/app/components/Global/Card';
import TableTemuanHasil from '@/app/components/pelaksanaan/table/tableTemuanHasil';
import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const RingkasanPengawasanPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Ringkasan Pengawasan</h3>
      <MapDataST
        title="Buat Temuan Hasil"
        todo="pelaporan/ringkasanpengawasan/form"
      />
      <CardComponents>
        <TableTemuanHasil />
      </CardComponents>
    </div>
  );
};

export default RingkasanPengawasanPage;
