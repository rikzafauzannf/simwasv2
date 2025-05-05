'use client'
import { CardComponents } from '@/app/components/Global/Card';
import TableNHP from '@/app/components/pelaksanaan/table/tableNHP';
import MapDataST from '@/app/components/realisasi/dataST';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import React from 'react';

const NotaHasilPengawasanPage = () => {
  const {user} = useAuthStore()
  const hashPermisson = ['Developer','JFA']
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer','JFA']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Nota Hasil Pengawasan</h3>
        {hashPermisson.includes(String(user?.role))&&(<MapDataST title="Buat NHP" todo="notahasil/form" />)}    
        <div className="grid w-full gap-3">
          {/* <CardComponents> */}
          <TableNHP />
          {/* </CardComponents> */}
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default NotaHasilPengawasanPage;
