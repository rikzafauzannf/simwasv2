'use client';
import React from 'react';
import { useFetchById } from '@/hooks/useFetchById';
import InputPKPT from '@/app/components/perencanaan/form/InputPKPT';
import { PKPTDataBase } from '@/interface/interfacePKPT';

interface PageProps {
  params: {
    id_pkpt?: number;
  };
}

const ActiontPKPTPage: React.FC<PageProps> = ({ params }) => {
  const { data: DataPKPT, isLoading } = useFetchById<PKPTDataBase>(
    'pkpt',
    Number(params.id_pkpt)
  );

  return (

    <InputPKPT
      mode="update"
      data={DataPKPT ?? undefined}
      status={DataPKPT?.status}

    />
  );
};

export default ActiontPKPTPage;
