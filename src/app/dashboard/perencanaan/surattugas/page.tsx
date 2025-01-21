import { CardComponents } from '@/app/components/Global/Card';
import TableSuratTugas from '@/app/components/perencanaan/table/TableSuratTugas';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const SuratTugasPage = () => {
  return (
    <AuthRoleWrapper allowedRoles={['Admin', 'Perencana', 'Pimpinan']}>
      <div className="space-y-3">
        <h3>Surat Tugas</h3>
        {/* <CollapseComponents title="+ Buat Rekap Surat Tugas">
        <MapDataPkpt todo="perencanaan/surattugas/form" />
      </CollapseComponents> */}

        <MapDataPkpt todo="perencanaan/surattugas/form" title="Buat ST" />
        <div className="grid w-full gap-3">
          <CardComponents>
            <TableSuratTugas />
          </CardComponents>
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default SuratTugasPage;
