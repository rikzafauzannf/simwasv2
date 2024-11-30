import LembarHasilPengawasan from '@/app/components/pelaksanaan/form/lembarHasilPengawasan';
import React from 'react';

interface pageProps {
  params: {
    id_st: string;
  };
}

const LembarHasilForm = ({ params }: pageProps) => {
  const id_st = params.id_st;
  return (
    <div className="space-y-3">
      <LembarHasilPengawasan />
    </div>
  );
};

export default LembarHasilForm;
