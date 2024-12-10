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
  const pdfUrl = `/AI_ML.pdf`;

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Detail Surat Tugas {id}</h3>
      <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} />
      <LaporanMingguanComponent id_pkpt={1} id_st='TG123456'/>
    </div>
  );
};

export default ViewSuratTugas;
