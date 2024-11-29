'use client';
import LaporanMingguanComponent from '@/app/components/pelaksanaan/laporanMingguan';
import React from 'react';

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
      <iframe
        src={pdfUrl}
        className="w-full h-[500px] rounded-sm shadow-md"
      ></iframe>
      <LaporanMingguanComponent />
    </div>
  );
};

export default ViewSuratTugas;
