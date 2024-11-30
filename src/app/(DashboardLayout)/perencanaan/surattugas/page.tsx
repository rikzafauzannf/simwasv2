import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import TableSuratTugas from '@/app/components/perencanaan/table/TableSuratTugas';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import React from 'react';

const SuratTugasPage = () => {
  return (
    <div className="space-y-3">
      <h3>Surat Tugas</h3>
      <CollapseComponents title="+ Buat Rekap Surat Tugas">
        <MapDataPkpt todo="perencanaan/surattugas/form" />
      </CollapseComponents>
      <div className="grid w-full gap-3">
        <CardComponents>
          <TableSuratTugas />
        </CardComponents>
      </div>
    </div>
  );
};

export default SuratTugasPage;
