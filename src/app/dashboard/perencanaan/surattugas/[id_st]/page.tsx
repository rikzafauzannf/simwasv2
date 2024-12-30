'use client';

import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { useFetchById } from '@/hooks/useFetchById';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { CardComponents } from '@/app/components/Global/Card';
import { useGetNameUser } from '@/hooks/useGetName';

interface PageProps {
  params: {
    id_st: number;
  };
}

const ViewSuratTugas: React.FC<PageProps> = ({ params }) => {
  const id = params.id_st;

  const { data: DataST, error } = useFetchById<SuratTugasData>(
    'surat_tugas',
    id
  );

  const {getNameUser,getUserNIP} = useGetNameUser()

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
      <h3 className="text-xl"># Detail Surat Tugas</h3>

      <CardComponents>
        <div className="grid md:flex md:justify-between md:items-center gap-2 w-full">
          <div>
            <p>{DataST?.bulan}</p>
            <p className="text-slate-800 font-semibold">
              {DataST?.waktu_penugasan} - Hari
            </p>
          </div>
          
            <h1>{DataST?.no_tglsp}</h1>
            <p>Laporan - {DataST?.jumlah_laporan}</p>
            <p>Object - {DataST?.jumlah_objek}</p>
          
        </div>
        
        <hr />
        <h2># {DataST?.program_audit}</h2>
        <h3>{DataST?.keterangan}</h3>
        <hr />

        <div className='grid grid-cols-4 gap-3'>
          <div>
            <p>Tim Pemeriksa</p>
            <h2>{getNameUser(Number(DataST?.tim_pemeriksa))}</h2>
            <p>NIP - {getUserNIP(Number(DataST?.tim_pemeriksa))}</p>
          </div>
          <div>
            <p>Wakil Penanggung Jawab</p>
            <h2>{getNameUser(Number(DataST?.wk_penanggung_jawab))}</h2>
            <p>NIP - {getUserNIP(Number(DataST?.wk_penanggung_jawab))}</p>
          </div>
          <div>
            <p>Pengendali Teknis</p>
            <h2>{getNameUser(Number(DataST?.pengendali_teknis))}</h2>
            <p>NIP - {getUserNIP(Number(DataST?.pengendali_teknis))}</p>
          </div>
          <div>
            <p>Ketua Tim</p>
            <h2>{getNameUser(Number(DataST?.ketua_tim))}</h2>
            <p>NIP - {getUserNIP(Number(DataST?.ketua_tim))}</p>
          </div>
          <div className='col-span-4'>
            <p>Anggota Tim</p>
            <h2>{DataST?.anggota_tim
          .split(',')
          .map((id) => getNameUser(Number(id)))
          .join(', ')}
          </h2>
          </div>
        </div>
      </CardComponents>

      <CardComponents>
        <iframe src={pdfEmbedUrl} style={{ width: '100%', height: '500px' }} />
      </CardComponents>
    </div>
  );
};

export default ViewSuratTugas;
