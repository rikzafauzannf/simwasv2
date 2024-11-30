import NotaHasilPengawasan from '@/app/components/pelaksanaan/form/notaHasilPengawasan';
import React from 'react';

interface PageProps {
  params: {
    id_st: string;
  };
}

const FormNotaHasilPage = ({ params }: PageProps) => {
  const id_st = params.id_st;
  return (
    <div>
      <NotaHasilPengawasan />
    </div>
  );
};

export default FormNotaHasilPage;
