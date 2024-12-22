import InputSuratTugas from '@/app/components/perencanaan/form/inputSuratTugas';
import React from 'react';
interface PageProps {
  params: {
    id_pkpt: number;
  };
}

const FormRekapSuratPage: React.FC<PageProps> = ({ params }) => {
  const id = params.id_pkpt;
  return (
    <div>
      <InputSuratTugas id_pkpt={id} />
    </div>
  );
};

export default FormRekapSuratPage;
