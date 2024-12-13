import NotaHasilPengawasan from '@/app/components/pelaksanaan/form/notaHasilPengawasan';
import React from 'react';

interface PageProps {
  params: {
    id_st: number;
  };
}

const FormNotaHasilPage = ({ params }: PageProps) => {
  const id_st = params.id_st;

  const id_pkpt = 11;
  const id_no = '2023-001';
  return (
    <div>
      <NotaHasilPengawasan id_pkpt={id_pkpt} id_no={id_no} />
    </div>
  );
};

export default FormNotaHasilPage;
