import LembarHasilPengawasan from '@/app/components/pelaksanaan/form/lembarHasilPengawasan';
import React from 'react';

interface pageProps {
  params: {
    id_st: string;
  };
}

const LembarHasilForm = ({ params }: pageProps) => {
  const id_st = params.id_st;

  const id_pkpt = 11;
  const id_no = '2023-001';
  return (
    <div className="space-y-3">
      <LembarHasilPengawasan id_pkpt={id_pkpt} id_no={id_no} />
    </div>
  );
};

export default LembarHasilForm;
