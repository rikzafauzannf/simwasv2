import React from 'react';
import { CardAccumulate } from '@/app/components/Global/Card';

const AkumulasiData = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 w-full gap-3">
      <CardAccumulate Header="PKPT Terealisasi" Count={2000} />
      <CardAccumulate Header="PKPT Disetujui" Count={2000} />
      <CardAccumulate Header="PKPT Monitoring & Review" Count={2000} />
    </section>
  );
};

export default AkumulasiData;
