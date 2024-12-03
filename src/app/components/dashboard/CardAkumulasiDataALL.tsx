import React from 'react';
import AkumulasiDataPKPT from '../perencanaan/AkumulasiDataPKPT';
import { CardAccumulate } from '../Global/Card';

const CardAkumulasiDataALL = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2">
        <AkumulasiDataPKPT />
      </div>
      <CardAccumulate
        Header="Jumlah NHP"
        Count={2}
        imgurl="/images/logos/dark-logo.svg"
      />
      <CardAccumulate
        Header="Jumlah LHP"
        Count={2}
        imgurl="/images/logos/light-logo.svg"
      />
    </section>
  );
};

export default CardAkumulasiDataALL;
