import { CardComponents } from '@/app/components/Global/Card';
import TableTemuanHasil from '@/app/components/pelaksanaan/table/tableTemuanHasil';
import MapDataST from '@/app/components/realisasi/dataST';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const RingkasanPengawasanPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Ringkasan Pengawasan</h3>
        <MapDataST
          title="Buat Temuan Hasil"
          todo="pelaporan/ringkasanpengawasan/form"
        />
        <div className="grid w-full gap-3">
          <CardComponents>
            <TableTemuanHasil />
          </CardComponents>
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default RingkasanPengawasanPage;
