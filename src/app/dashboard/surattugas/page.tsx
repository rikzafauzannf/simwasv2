'use client'
import { CardComponents } from '@/app/components/Global/Card';
import TableSuratTugas from '@/app/components/perencanaan/table/TableSuratTugas';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import React from 'react';

const SuratTugasPage = () => {
  const {user} = useAuthStore()
  const hashPermission = ['Developer','PEP','JFA']
  
  return (
    <AuthRoleWrapper
      allowedRoles={[
        'Admin',
        'Perencana',
        'Pimpinan',
        'Pelaksana',
        'Auditor',
        'Developer',
        'PEP',
        'JFA'
      ]}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Surat Tugas</h3>
        {/* <CollapseComponents title="+ Buat Rekap Surat Tugas">
        <MapDataPkpt todo="perencanaan/surattugas/form" />
      </CollapseComponents> */}

          
{hashPermission.includes(String(user?.role)) && (
  <MapDataPkpt todo="surattugas/form" title="Buat ST" />
)}

        
        <div className="grid w-full gap-3">
          {/* <CardComponents> */}
          <TableSuratTugas />
          {/* </CardComponents> */}
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default SuratTugasPage;
