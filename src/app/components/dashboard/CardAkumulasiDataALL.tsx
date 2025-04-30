'use client';
import React from 'react';
import AkumulasiDataPKPT from '../perencanaan/AkumulasiDataPKPT';
import { CardAccumulate } from '../Global/Card';
import imgST from '/public/images/products/surat_tugas_bg.svg';
import imgLHP from '/public/images/products/lhp_bg.svg';
import { useFetchOne } from '@/hooks/useFetchOne';
import { DataSumaryPkpt } from '@/interface/interfaceChartData';

const CardAkumulasiDataALL = () => {
  const { data: dataSummary, isLoading } =
    useFetchOne<DataSumaryPkpt>('dashboartotalpkpt');

  const totalStPkpt = dataSummary?.total_st_pkpt ?? 0;
  const totalStNonPkpt = dataSummary?.total_st_non_pkpt ?? 0;
  const totalPKPT = dataSummary?.total_pkpt ?? 0;
  const totalNonPKPT = dataSummary?.total_non_pkpt ?? 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <AkumulasiDataPKPT />
      </div>
      <CardAccumulate
        Header="Surat Tugas PKPT"
        Count={Number(totalStPkpt)}
        imgurl={imgST}
      />
      <CardAccumulate
        Header="Surat Tugas Non-PKPT"
        Count={Number(totalStNonPkpt)}
        imgurl={imgLHP}
      />
    </section>
  );
};

export default CardAkumulasiDataALL;
