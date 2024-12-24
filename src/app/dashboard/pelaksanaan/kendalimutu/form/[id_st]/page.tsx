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
  const id_st = 'TG123456';
  const id_pkpt = 1;
  return (
    <div className="space-y-3">
      <InputKendaliMutu id_st={id_st} id_pkpt={id_pkpt} />
      <div className="grid w-full gap-3">
        <CardComponents>
          <TableKendaliMutu />
        </CardComponents>
      </div>      
    </div>
  );
};

export default FormKendaliMutuPage;
