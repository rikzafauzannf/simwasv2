import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const NotaHasilPengawasanPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Nota Hasil Pengawasan</h3>
      <MapDataST title="Upload NHP" todo="pelaksanaan/notahasil/form" />
    </div>
  );
};

export default NotaHasilPengawasanPage;
