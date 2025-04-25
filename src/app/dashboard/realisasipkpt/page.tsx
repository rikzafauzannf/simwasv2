// 'use client';
import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import TableRealisasi from '@/app/components/realisasi/tablerealisasi';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const RealisasiPKPTPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3">
        <h3>Data Realisasi PKPT</h3>

        <CardComponents>
          <h1 className="text-2xl">Development Process</h1>
          <p>
            fitur realisasi masi belum redy, (dalam proses analisis bagian
            realisasi)
          </p>
        </CardComponents>

        <CollapseComponents title="Input Data Realisasi">
          <MapDataPkpt
            todo="perencanaan/realisasipkpt/inputrealisasi"
            title="Buat Realisasi"
          />
        </CollapseComponents>

        <div className="grid w-full gap-3">
          <CardComponents>
            <TableRealisasi />
          </CardComponents>
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default RealisasiPKPTPage;
