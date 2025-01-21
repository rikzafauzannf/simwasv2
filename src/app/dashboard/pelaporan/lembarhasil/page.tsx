import { CardComponents } from '@/app/components/Global/Card';
import TableLHP from '@/app/components/pelaksanaan/table/tableLHP';
import MapDataNHP from '@/app/components/realisasi/dataNHP';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const LembarHasilPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Lembar Hasil Pengawasan</h3>
        <MapDataNHP todo="pelaporan/lembarhasil/form" />
        <CardComponents>
          <TableLHP />
        </CardComponents>
      </div>
    </AuthRoleWrapper>
  );
};

export default LembarHasilPage;
