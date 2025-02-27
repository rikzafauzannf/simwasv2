import InputRekomendasi from '@/app/components/pelaksanaan/form/inputRekomendasi';
import InputRingkasanPengawasan from '@/app/components/pelaksanaan/form/inputRingkasanPengawasan';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PageProps {
  params: {
    id_temuan: number;
  };
}

const FormRingkasanPengawasanPage: React.FC<PageProps> = ({ params }) => {
  console.log('params data page props: ', params.id_temuan);
  return (
    <AuthRoleWrapper allowedRoles={['Pelaksana', 'Auditor', 'Developer']}>
      <div className="space-y-3">
        <InputRekomendasi id_temuan={params.id_temuan} />
      </div>
    </AuthRoleWrapper>
  );
};

export default FormRingkasanPengawasanPage;
