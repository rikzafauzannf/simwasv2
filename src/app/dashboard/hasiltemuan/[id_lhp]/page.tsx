import InputTemuan from '@/app/components/pelaksanaan/form/inputTemuan';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PageProps {
  params: {
    id_lhp: number;
  };
}

const FormRingkasanPengawasanPage: React.FC<PageProps> = ({ params }) => {
  console.log('params data page props: ', params.id_lhp);
  return (
    <AuthRoleWrapper allowedRoles={['Pelaksana', 'Auditor', 'Developer','JFA','PEP']}>
      <div className="space-y-3">
        <InputTemuan id_lhp={params.id_lhp} />
      </div>
    </AuthRoleWrapper>
  );
};

export default FormRingkasanPengawasanPage;
