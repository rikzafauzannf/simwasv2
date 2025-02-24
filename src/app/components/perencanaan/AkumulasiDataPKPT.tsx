'use client';
import React, { useEffect, useState } from 'react';
import { CardAccumulate } from '../Global/Card';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { FirestoreService } from '@/services/firestore.service';
import imgPKPT from '/public/images/products/pkpt-bg.svg';
import imgNonPKPT from '/public/images/products/nonpkpt-bg.svg';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchAll } from '@/hooks/useFetchAll';
const AkumulasiDataPKPT = () => {
  const {
    data: DataPKPT,
    isLoading,
    error,
    refetch,
  } = useFetchAll<PKPTDataBase>('/pkpt');

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const data_pkpt = DataPKPT.filter((item) => item.status === 'pkpt');
  const data_nonpkpt = DataPKPT.filter((item) => item.status === 'non-pkpt');
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
      <CardAccumulate
        Header="Jumlah PKPT"
        Count={data_pkpt.length}
        // Count={20}
        imgurl={imgPKPT}
      />
      <CardAccumulate
        Header="Jumlah Non-PKPT"
        Count={data_nonpkpt.length}
        // Count={35}
        imgurl={imgNonPKPT}
      />
    </section>
  );
};

export default AkumulasiDataPKPT;
