import { CardComponents } from '@/app/components/Global/Card';
import InputKendaliMutu from '@/app/components/pelaksanaan/form/inputKendaliMutu';
import LaporanMingguanComponent from '@/app/components/pelaksanaan/laporanMingguan';
import TableKendaliMutu from '@/app/components/pelaksanaan/table/tableKendaliMutu';
import React from 'react';

interface PageProps {
  params: {
    id_st: number;
  };
}

const FormKendaliMutuPage = ({ params }: PageProps) => {
  const id = params.id_st;
  return (
    <div className="space-y-3">
      <InputKendaliMutu />
      <div className="grid w-full gap-3">
        <CardComponents>
          <TableKendaliMutu />
        </CardComponents>
      </div>
      <LaporanMingguanComponent />
    </div>
  );
};

export default FormKendaliMutuPage;
