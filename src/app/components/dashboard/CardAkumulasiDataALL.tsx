import React from 'react';
import AkumulasiDataPKPT from '../perencanaan/AkumulasiDataPKPT';
import { CardAccumulate } from '../Global/Card';

const CardAkumulasiDataALL = () => {
  return (
    <section className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <AkumulasiDataPKPT />
      </div>
      <CardAccumulate Header="Jumlah NHP" Count={2} />
      <CardAccumulate Header="Jumlah LHP" Count={2} />
    </section>
  );
};

export default CardAkumulasiDataALL;
