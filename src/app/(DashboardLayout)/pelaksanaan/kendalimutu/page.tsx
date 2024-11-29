import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import TableKendaliMutu from '@/app/components/pelaksanaan/table/tableKendaliMutu';
import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const KendaliMutuPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Kendali Mutu</h3>
      <CollapseComponents title="+ Input Kendali Mutu">
        <MapDataST/>
      </CollapseComponents>
      <div className="grid w-full gap-3">
        <CardComponents>
          <TableKendaliMutu />
        </CardComponents>
      </div>
    </div>
  );
};

export default KendaliMutuPage;
