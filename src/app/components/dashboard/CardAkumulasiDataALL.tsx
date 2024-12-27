"use client"
import React from 'react';
import AkumulasiDataPKPT from '../perencanaan/AkumulasiDataPKPT';
import { CardAccumulate } from '../Global/Card';
import imgST from '/public/images/products/surat_tugas_bg.svg';
import imgLHP from '/public/images/products/lhp_bg.svg';
import { useFetchAll } from '@/hooks/useFetchAll';
const CardAkumulasiDataALL = () => {
  const {data:DataSuratTugas} = useFetchAll('surat_tugas')
  const JumlahSurat = DataSuratTugas.length

  const {data:DataLHP} = useFetchAll('lhp')
  const JumlahLHP = DataLHP.length
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="md:col-span-2">
        <AkumulasiDataPKPT />
      </div>
      <CardAccumulate Header="Surat Tugas" Count={JumlahSurat} imgurl={imgST} />
      <CardAccumulate Header="Jumlah LHP" Count={JumlahLHP} imgurl={imgLHP} />
    </section>
  );
};

export default CardAkumulasiDataALL;
