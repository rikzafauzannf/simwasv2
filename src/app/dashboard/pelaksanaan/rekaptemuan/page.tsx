import React from 'react';
import MapDataTemuanHasil from '../../../components/realisasi/dataTemuanHasil';
import { CardComponents } from '@/app/components/Global/Card';
import TableTindakLanjut from '@/app/components/pelaksanaan/table/tableTindakLanjut';
import TableRekapTemuan from '@/app/components/pelaksanaan/table/tableRekapTemuan';

const RekapTemuanPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Rekap Temuan</h3>
      <MapDataTemuanHasil
        todo="pelaksanaan/rekaptemuan/form"
        title="Buat Rekap Temuan"
      />
      <CardComponents>
        <TableRekapTemuan />
      </CardComponents>
    </div>
  );
};

export default RekapTemuanPage;
