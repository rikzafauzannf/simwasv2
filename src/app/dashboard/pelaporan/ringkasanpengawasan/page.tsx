import { CardComponents } from '@/app/components/Global/Card';
import TableRekomendasiTemuan from '@/app/components/pelaksanaan/table/tableRekomendasi';
import TableTemuanHasil from '@/app/components/pelaksanaan/table/tableTemuanHasil';
import MapDataST from '@/app/components/realisasi/dataST';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const RingkasanPengawasanPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3 w-full">
        <h3 className="text-xl">Ringkasan Pengawasan</h3>
        <MapDataST
          title="Buat Temuan Hasil / Rekomendasi"
          todo="pelaporan/ringkasanpengawasan"
        />
        <div className="grid min-w-full gap-3">
          {/* <CardComponents> */}
            <TableTemuanHasil />
          {/* </CardComponents> */}

          <TableRekomendasiTemuan/>
          
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default RingkasanPengawasanPage;
