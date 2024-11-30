import React from 'react';
import { CardComponents } from '../../Global/Card';
import TableKendaliMutu from '../table/tableKendaliMutu';
import LaporanMingguanComponent from '../laporanMingguan';

const KendaliMutu = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Data Kendalimutu</h3>
      <div className="grid w-full gap-3">
        <CardComponents>
          <TableKendaliMutu />
        </CardComponents>
      </div>
      <LaporanMingguanComponent />
    </div>
  );
};

export default KendaliMutu;
