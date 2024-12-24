'use client';
import LaporanMingguanComponent from '@/app/components/pelaksanaan/laporanMingguan';
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

interface PageProps {
  params: {
    id_st: number;
  };
}

const ViewSuratTugas = ({ params }: PageProps) => {
  const id = params.id_st;

  // URL PDF yang sesuai dengan id_st
  const pdfUrl = `https://drive.google.com/file/d/1Hf4GdmqiluJ9O6giIj7yrq7fS3iC9lTa/view?usp=sharing`;

  // Mengubah URL untuk menampilkan PDF di iframe
  const pdfEmbedUrl = pdfUrl.replace('/view?usp=sharing', '/preview');

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Detail Surat Tugas {id}</h3>
      <iframe src={pdfEmbedUrl} style={{ width: '100%', height: '500px' }} />
      <LaporanMingguanComponent id_pkpt={1} id_st="TG123456" />
    </div>
  );
};

export default ViewSuratTugas;
