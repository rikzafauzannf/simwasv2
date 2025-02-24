'use client';
import React from 'react';
import AkumulasiDataPKPT from '../perencanaan/AkumulasiDataPKPT';
import { CardAccumulate } from '../Global/Card';
import imgST from '/public/images/products/surat_tugas_bg.svg';
import imgLHP from '/public/images/products/lhp_bg.svg';
import { useFetchAll } from '@/hooks/useFetchAll';
import { DataSumaryPkpt } from '@/interface/interfaceChartData';

const CardAkumulasiDataALL = () => {
  const { data: dataSummary } = useFetchAll<DataSumaryPkpt>('dashboartotalpkpt');
  const totalStPkpt = dataSummary[0]?.total_st_pkpt ;
  const totalStNonPkpt = dataSummary[0]?.total_st_non_pkpt;

  // console.log('data st : ',dataSummary )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <AkumulasiDataPKPT />
      </div>
      <CardAccumulate Header="Surat Tugas PKPT" Count={Number(totalStPkpt)} imgurl={imgST} />
      <CardAccumulate Header="Surat Tugas Non-PKPT" Count={Number(totalStNonPkpt)} imgurl={imgLHP} />
    </section>
  );
};

export default CardAkumulasiDataALL;
