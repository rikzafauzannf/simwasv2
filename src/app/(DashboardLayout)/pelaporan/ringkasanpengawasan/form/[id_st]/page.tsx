import InputRingkasanPengawasan from '@/app/components/pelaksanaan/form/inputRingkasanPengawasan';
import React from 'react';

interface PageProps {
  params: {
    id_st: string;
  };
}

const FormRingkasanPengawasanPage = ({ params }: PageProps) => {
  return (
    <div className="space-y-3">
      <InputRingkasanPengawasan />
    </div>
  );
};

export default FormRingkasanPengawasanPage;
