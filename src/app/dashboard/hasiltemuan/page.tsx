import { CardComponents } from '@/app/components/Global/Card';
import TableRekomendasiTemuan from '@/app/components/pelaksanaan/table/tableRekomendasi';
import TableTemuanHasil from '@/app/components/pelaksanaan/table/tableTemuanHasil';
import MapDataLHP from '@/app/components/realisasi/dataLHP';
import MapDataST from '@/app/components/realisasi/dataST';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const RingkasanPengawasanPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3 w-full">
        <h3 className="text-xl">Ringkasan Hasil</h3>
        <MapDataLHP title="Buat Ringkasan Hasil" todo="hasiltemuan" />
        <div className="grid min-w-full gap-3">
          {/* <CardCompo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nents> */}
          <TableTemuanHasil />
          {/* </CardComponents> */}

          <TableRekomendasiTemuan />
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default RingkasanPengawasanPage;
