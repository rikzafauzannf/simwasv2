import { CardComponents } from '@/app/components/Global/Card';
import TableNHP from '@/app/components/pelaksanaan/table/tableNHP';
import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const NotaHasilPengawasanPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Nota Hasil Pengawasan</h3>
      <MapDataST title="Upload NHP" todo="pelaksanaan/notahasil/form" />
      <CardComponents>
        <TableNHP />
      </CardComponents>
    </div>
  );
};

export default NotaHasilPengawasanPage;
