'use client'
import { CardComponents } from '@/app/components/Global/Card';
import TableLHP from '@/app/components/pelaksanaan/table/tableLHP';
import MapDataNHP from '@/app/components/realisasi/dataNHP';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import React from 'react';

const LembarHasilPage = () => {
  const {user} = useAuthStore()
  const hashPermission = ['Developer','JFA','PEP']
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer','JFA','PEP']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Laporan Hasil Pengawasan</h3>
        {hashPermission.includes(String(user?.role))&&(<MapDataNHP todo="laporanhasil/form" />)}        
        <div className="grid w-full gap-3">
          {/* <CardComponents> */}
          <TableLHP />
          {/* </CardComponents> */}
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default LembarHasilPage;
