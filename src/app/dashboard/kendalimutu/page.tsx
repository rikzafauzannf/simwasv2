import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import TableKendaliMutu from '@/app/components/pelaksanaan/table/tableKendaliMutu';
import MapDataPkpt from '@/app/components/realisasi/datapkpt';
import MapDataST from '@/app/components/realisasi/dataST';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const KendaliMutuPage = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer']}
    >
      <div className="space-y-3">
        <h3 className="text-xl">Kendali Mutu</h3>
        {/* <MapDataST
        title="Buat Kendalimutu / laporan"
        todo="pelaksanaan/kendalimutu/form"
      /> */}
        <MapDataST title="Buat Kendalimutu" todo="kendalimutu/form" />
        <div className="grid w-full gap-3">
          <CardComponents>
            <TableKendaliMutu />
          </CardComponents>
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default KendaliMutuPage;
