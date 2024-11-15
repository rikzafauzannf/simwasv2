// 'use client';
import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import TableRealisasi from '@/app/components/realisasi/tablerealisasi';
import React from 'react';

const RealisasiPKPTPage = () => {
  return (
    <div className="space-y-3">
      <h3>Data Realisasi PKPT</h3>

      <CollapseComponents title="Input Data Realisasi">
        <MapDataPkpt />
      </CollapseComponents>

      <CardComponents>
        <TableRealisasi />
      </CardComponents>
    </div>
  );
};

export default RealisasiPKPTPage;
