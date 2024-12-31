import LembarHasilPengawasan from '@/app/components/pelaksanaan/form/lembarHasilPengawasan';
import React from 'react';

interface pageProps {
  params: {
    id_st: number;
  };
}

const LembarHasilForm: React.FC<pageProps> = ({ params }) => {
  console.log('Received params: ', params);
  const id_nhp = params.id_st;
  console.log('params nhp id: ', id_nhp);

  return (
    <div className="space-y-3">
      <LembarHasilPengawasan id_nhp={id_nhp} />
    </div>
  );
};

export default LembarHasilForm;
