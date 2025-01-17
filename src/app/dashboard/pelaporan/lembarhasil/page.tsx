import TableLHP from '@/app/components/pelaksanaan/table/tableLHP';
import MapDataNHP from '@/app/components/realisasi/dataNHP';
import React from 'react';

const LembarHasilPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Lembar Hasil Pengawasan</h3>
      <MapDataNHP todo="pelaporan/lembarhasil/form" />
      <TableLHP />
    </div>
  );
};

export default LembarHasilPage;
