import React from 'react';
import MapDataTemuanHasil from '../../../components/realisasi/dataTemuanHasil';
import { CardComponents } from '@/app/components/Global/Card';
import TableTindakLanjut from '@/app/components/pelaksanaan/table/tableTindakLanjut';

const TindakLajutPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Tindak Lanjut</h3>
      <MapDataTemuanHasil todo="pelaksanaan/tindaklanjut/form" />
      <CardComponents>
        <TableTindakLanjut />
      </CardComponents>
    </div>
  );
};

export default TindakLajutPage;
