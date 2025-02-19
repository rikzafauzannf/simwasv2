import { CardComponents } from '@/app/components/Global/Card';
import InputKendaliMutu from '@/app/components/pelaksanaan/form/inputKendaliMutu';
import LaporanMingguanComponent from '@/app/components/pelaksanaan/laporanMingguan';
import TableKendaliMutu from '@/app/components/pelaksanaan/table/tableKendaliMutu';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PageProps {
  params: {
    id_st: number;
  };
}

const FormKendaliMutuPage: React.FC<PageProps> = ({ params }) => {
  console.log('data params: ', params);
  const id_st = params.id_st;

  return (
    <AuthRoleWrapper allowedRoles={['Pelaksana', 'Auditor', 'Developer']}>
      <div className="space-y-3">
        <InputKendaliMutu id_st={id_st} />
      </div>
    </AuthRoleWrapper>
  );
};

export default FormKendaliMutuPage;
