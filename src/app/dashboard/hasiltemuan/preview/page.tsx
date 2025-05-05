import TableTemuanPreview from '@/app/components/tablePreview/tableTemuanPreview';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

const PreviewTemuan = () => {
  return (
    <AuthRoleWrapper
      allowedRoles={['Admin', 'Pimpinan', 'Pelaksana', 'Auditor', 'Developer','JFA','PEP']}
    >
      <TableTemuanPreview />
    </AuthRoleWrapper>
  );
};

export default PreviewTemuan;
