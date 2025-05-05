import InputPKPT from '@/app/components/perencanaan/form/InputPKPT';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PageProps {
  params: {
    status: string;
  };
}

const CreatePage = ({ params }: PageProps) => {
  const status = params.status;
  return (
    <AuthRoleWrapper allowedRoles={['Perencana', 'Developer','PEP']}>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold capitalize">Input {status}</h1>
        <InputPKPT status={status} />
      </div>
    </AuthRoleWrapper>
  );
};

export default CreatePage;
