'use client'
import React from 'react';
import MapDataTemuanHasil from '../../components/realisasi/dataTemuanHasil';
import { CardComponents } from '@/app/components/Global/Card';
import TableTindakLanjut from '@/app/components/pelaksanaan/table/tableTindakLanjut';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

const TindakLajutPage = () => {
  const {user} = useAuthStore()
  const hashPermisson = ['Developer','PEP','JFA','OPD']
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer','PEP','JFA','OPD']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Tindak Lanjut</h3>
        {hashPermisson.includes(String(user?.role))&&(<MapDataTemuanHasil
          todo="tindaklanjut/form"
          title="Buat Tindak Lanjut"
        />)}
        
        <div className="grid w-full gap-3">
          {/* <CardComponents> */}
          <TableTindakLanjut />
          {/* </CardComponents> */}
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default TindakLajutPage;
