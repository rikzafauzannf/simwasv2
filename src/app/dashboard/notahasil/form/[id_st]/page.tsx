import NotaHasilPengawasan from '@/app/components/pelaksanaan/form/notaHasilPengawasan';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PageProps {
  params: {
    id_st: number;
  };
}

const FormNotaHasilPage = ({ params }: PageProps) => {
  const id_st = params.id_st;

  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer','JFA']}
    >
      <NotaHasilPengawasan id_st={id_st} />
    </AuthRoleWrapper>
  );
};

export default FormNotaHasilPage;
