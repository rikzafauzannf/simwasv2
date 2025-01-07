import InputRingkasanPengawasan from '@/app/components/pelaksanaan/form/inputRingkasanPengawasan';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PageProps {
  params: {
    id_st: number;
  };
}

const FormRingkasanPengawasanPage: React.FC<PageProps> = ({ params }) => {
  console.log('params data page props: ', params.id_st);
  return (
    <AuthRoleWrapper allowedRoles={['Pelaksana', 'Auditor']}>
      <div className="space-y-3">
        <InputRingkasanPengawasan id_st={params.id_st} />
      </div>
    </AuthRoleWrapper>
  );
};

export default FormRingkasanPengawasanPage;
