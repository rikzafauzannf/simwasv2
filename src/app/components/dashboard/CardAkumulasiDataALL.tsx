import React from 'react';
import AkumulasiDataPKPT from '../perencanaan/AkumulasiDataPKPT';
import { CardAccumulate } from '../Global/Card';

const CardAkumulasiDataALL = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="md:col-span-2">
        <AkumulasiDataPKPT />
      </div>
      <CardAccumulate
        Header="Surat Tugas"
        Count={2}
        imgurl="/images/products/surat_tugas_bg.svg"
      />
      <CardAccumulate
        Header="Jumlah LHP"
        Count={2}
        imgurl="/images/products/lhp_bg.svg"
      />
    </section>
  );
};

export default CardAkumulasiDataALL;
