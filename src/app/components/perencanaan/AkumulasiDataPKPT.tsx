import React from 'react';
import { CardAccumulate } from '../Global/Card';

const AkumulasiDataPKPT = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
      <CardAccumulate Header="Jumlah PKPT" Count={2000} />
      <CardAccumulate Header="Jumlah Non-PKPT" Count={2000} />
    </section>
  );
};

export default AkumulasiDataPKPT;
