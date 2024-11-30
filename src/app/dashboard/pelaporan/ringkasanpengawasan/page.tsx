import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const RingkasanPengawasanPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Ringkasan Pengawasan</h3>
      <MapDataST
        title="Buat Ringkasan Pengawasan"
        todo="pelaporan/ringkasanpengawasan/form"
      />
    </div>
  );
};

export default RingkasanPengawasanPage;
