'use client';
import InputKendaliMutu from '@/app/components/pelaksanaan/form/inputKendaliMutu';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useFetchById } from '@/hooks/useFetchById';
import { KendaliMutuData } from '@/interface/interfaceKendaliMutu';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import React from 'react';

interface PropsPape {
  params: {
    id_kendalimutu: number;
  };
}

const ActKendaliMutu = ({ params }: PropsPape) => {
  const { data: kendaliMutu } = useFetchById<KendaliMutuData>(
    'kendali_mutu',
    params.id_kendalimutu
  );
  return (
    <AuthRoleWrapper allowedRoles={['Developer','JFA']}>
    <InputKendaliMutu
      mode="update"
      id_kendalimutu={params.id_kendalimutu}
      id_st={Number(kendaliMutu?.id_st)}
      data={kendaliMutu ?? undefined}
    />
    </AuthRoleWrapper>
  );
};

export default ActKendaliMutu;
