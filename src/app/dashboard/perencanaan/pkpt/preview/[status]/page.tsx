import TablePKPTPreview from '@/app/components/tablePreview/tablePKPTPreview';
import React from 'react';

interface StatusProps {
  params: {
    status: string;
  };
}

const PreviewPage = ({ params }: StatusProps) => {
  return <TablePKPTPreview status={params.status} />;
};

export default PreviewPage;
