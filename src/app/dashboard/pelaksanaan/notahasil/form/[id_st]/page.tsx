import NotaHasilPengawasan from '@/app/components/pelaksanaan/form/notaHasilPengawasan';
import React from 'react';

interface PageProps {
  params: {
    id_st: number;
  };
}

const FormNotaHasilPage = ({ params }: PageProps) => {
  const id_st = params.id_st;

  return (
    <div>
      <NotaHasilPengawasan id_st={id_st} />
    </div>
  );
};

export default FormNotaHasilPage;
