import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const LembarHasilPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Lembar Hasil Pengawasan</h3>
      <MapDataST title="Buat LHP" todo="pelaporan/lembarhasil/form" />
    </div>
  );
};

export default LembarHasilPage;
