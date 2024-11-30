import { CardComponents } from '@/app/components/Global/Card';
import CollapseComponents from '@/app/components/Global/Collapse';
import TableKendaliMutu from '@/app/components/pelaksanaan/table/tableKendaliMutu';
import MapDataST from '@/app/components/realisasi/dataST';
import React from 'react';

const KendaliMutuPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Kendali Mutu</h3>
      <MapDataST />
    </div>
  );
};

export default KendaliMutuPage;
