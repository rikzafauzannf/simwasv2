import { CardComponents } from '@/app/components/Global/Card';
import TableLHP from '@/app/components/pelaksanaan/table/tableLHP';
import MapDataNHP from '@/app/components/realisasi/dataNHP';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const LembarHasilPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Lembar Hasil Pengawasan</h3>
        <MapDataNHP todo="pelaporan/lembarhasil/form" />
        <div className="grid w-full gap-3">
          <CardComponents>
            <TableLHP />
          </CardComponents>
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default LembarHasilPage;
