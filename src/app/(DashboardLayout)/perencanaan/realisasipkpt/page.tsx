// 'use client';
import CollapseComponents from '@/app/components/Global/Collapse';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import React from 'react';

const RealisasiPKPTPage = () => {
  return (
    <>
      <div className="mb-4">
        <h3>Data Realisasi PKPT</h3>
      </div>

      <CollapseComponents title="Input Data Realisasi">
        <MapDataPkpt />
      </CollapseComponents>
    </>
  );
};

export default RealisasiPKPTPage;
