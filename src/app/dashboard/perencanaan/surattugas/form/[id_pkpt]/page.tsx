import InputSuratTugas from '@/app/components/perencanaan/form/inputSuratTugas';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';
interface PageProps {
  params: {
    id_pkpt: number;
  };
}

const FormRekapSuratPage: React.FC<PageProps> = ({ params }) => {
  const id = params.id_pkpt;
  return (
    <AuthRoleWrapper allowedRoles={['Perencana', 'Pelaksana', 'Auditor']}>
      <InputSuratTugas id_pkpt={id} />
    </AuthRoleWrapper>
  );
};

export default FormRekapSuratPage;
