'use client';
import React, { useEffect, useState } from 'react';
import { CardAccumulate } from '../Global/Card';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { FirestoreService } from '@/services/firestore.service';
import imgPKPT from '/public/images/products/pkpt-bg.svg'
import imgNonPKPT from '/public/images/products/nonpkpt-bg.svg'
const AkumulasiDataPKPT = () => {
  const [DataPKPT, setDataPKPT] = useState<PKPTDataBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestoreService = new FirestoreService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await firestoreService.getAllData('pkpt');
        if (response.success && response.data) {
          const datapkpt = response.data as PKPTDataBase[];
          setDataPKPT(datapkpt);
          setError(null);
        } else {
          setError(new Error(response.message));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const data_pkpt = DataPKPT.filter((item) => item.status === 'pkpt');
  const data_nonpkpt = DataPKPT.filter((item) => item.status === 'non-pkpt');
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
      <CardAccumulate
        Header="Jumlah PKPT"
        Count={data_pkpt.length}
        imgurl={imgPKPT}
      />
      <CardAccumulate
        Header="Jumlah Non-PKPT"
        Count={data_nonpkpt.length}
        imgurl={imgNonPKPT}
      />
    </section>
  );
};

export default AkumulasiDataPKPT;
