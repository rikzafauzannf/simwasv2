'use client';

import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { useFetchById } from '@/hooks/useFetchById';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';

interface PageProps {
  params: {
    id_st: number;
  };
}

const ViewSuratTugas: React.FC<PageProps> = ({ params }) => {
  const id = params.id_st;

  const { data: DataST, error } = useFetchById<SuratTugasData>(
    'surat_tugas',
    params.id_st
  );

  // URL PDF yang sesuai dengan id_st
  const pdfUrl = DataST?.link_st;

  // Mengubah URL untuk menampilkan PDF di iframe
  const pdfEmbedUrl = pdfUrl?.replace('/view?usp=sharing', '/preview');

  if (error) {
    return <div>Error fetching data</div>; // Menangani kesalahan
  }

  if (!pdfEmbedUrl) {
    return <div>No PDF available</div>; // Menangani jika tidak ada PDF
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Detail Surat Tugas {id}</h3>
      <iframe src={pdfEmbedUrl} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default ViewSuratTugas;
