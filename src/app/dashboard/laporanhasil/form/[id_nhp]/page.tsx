import LembarHasilPengawasan from '@/app/components/pelaksanaan/form/lembarHasilPengawasan';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface pageProps {
  params: {
    id_nhp: number;
  };
}

const LembarHasilForm: React.FC<pageProps> = ({ params }) => {
  console.log('Received params: ', params);
  console.log('params nhp id: ', params.id_nhp);

  return (
    <AuthRoleWrapper allowedRoles={['Pelaksana', 'Auditor', 'Developer','JFA','PEP']}>
      <div className="space-y-3">
        <LembarHasilPengawasan id_nhp={params.id_nhp} />
      </div>
    </AuthRoleWrapper>
  );
};

export default LembarHasilForm;
