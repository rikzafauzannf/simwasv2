'use client';

import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { useFetchById } from '@/hooks/useFetchById';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { CardComponents } from '@/app/components/Global/Card';
import { useGetNameJenisAudit, useGetNameUser } from '@/hooks/useGetName';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import Link from 'next/link';
import { LHPData, NHPData } from '@/interface/interfaceHasilPengawasan';
import { useFetchAll } from '@/hooks/useFetchAll';
import { Icon } from '@iconify/react/dist/iconify.js';
import { formatToLocalDate } from '@/data/formatData';
import LaporanMingguanComponent from '@/app/dashboard/perencanaan/surattugas/[id_st]/laporanMingguan';
import DatahpCheck from './datahpCheck';

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

  const { data: DataNHP } = useFetchAll<NHPData>('nhp');
  const { data: DataLHP } = useFetchAll<LHPData>('lhp');

  const NHPMAP = DataNHP.filter((item) => item.id_st === Number(id));

  const { getNameUser, getUserNIP, getUserPhone } = useGetNameUser();
  const { getNameJenisAudit } = useGetNameJenisAudit();

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
    <AuthRoleWrapper
      allowedRoles={[
        'Admin',
        'Perencana',
        'Pimpinan',
        'Pelaksana',
        'Auditor',
        'Developer',
      ]}
    >
      <h3 className="text-xl mb-3"># Detail Surat Tugas</h3>
      <div className="grid lg:grid-cols-3 gap-3 mb-3">
        <div className="lg:col-span-2 space-y-3">
          <CardComponents>
            {/* <h2 className='text-lg'>Detail ST</h2> */}
            <section className="grid md:grid-cols-3 gap-3 w-full">
              <div>
                <p>Bulan</p>
                <h3>{DataST?.bulan}</h3>
              </div>
              <div>
                <p>No.Tgl.SP gsgsgsg</p>
                <h3>{DataST?.no_tglsp}</h3>
              </div>
              <div>
                <p>Program Audit/Kegiatan</p>
                <h3>{DataST?.program_audit}</h3>
              </div>
            </section>
          </CardComponents>

          <CardComponents>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <p>Jumlah HP</p>
                <h3>{DataST?.jumlah_hp} - Hari</h3>
              </div>
              <div className="md:col-span-2">
                <p>Waktu Penugasan Penugasan</p>
                <h3>{DataST?.waktu_penugasan}</h3>
              </div>
            </div>
          </CardComponents>

          <CardComponents>
            <div className="grid md:grid-cols-2 gap-3">
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
              <div className="md:col-span-2">
                <hr className="my-3" />
                <p>Anggota Tim</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {DataST?.anggota_tim.split(',').map((id, index) => {
                    return (
                      <div key={index}>
                        <h2>{getNameUser(Number(id))}</h2>
                        <p>NIP - {getUserNIP(Number(id))}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardComponents>

          <CardComponents>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <p>Jumlah Objek Pengawasan</p>
                <h3>{DataST?.jumlah_objek}</h3>
              </div>
              <div>
                <p>Jumlah Laporan</p>
                <h3>{DataST?.jumlah_laporan}</h3>
              </div>
              {/* <div>
                <p>No.Tgl.LHP/LHE/LHR</p>
                <h3>{DataST?.no_tgllh}</h3>
              </div> */}
              <div>
                <p>Jenis Audit</p>
                <h3>{getNameJenisAudit(Number(DataST?.id_jenis_audit))}</h3>
              </div>
              <div>
                <p>Keterangan</p>
                <h3>{DataST?.keterangan}</h3>
              </div>
              <div>
                <p>Link ST</p>
                <Link
                  href={String(DataST?.link_st)}
                  target="blank"
                  className="text-blue-400 hover:text-blue-600 font-semibold"
                >
                  Akses Link ST
                </Link>
                {/* <h3>{DataST?.link_st}</h3> */}
              </div>
            </div>
          </CardComponents>
        </div>

        <CardComponents>
          <iframe
            src={pdfEmbedUrl}
            style={{ width: '100%', height: '500px' }}
          />
        </CardComponents>
      </div>
      <div className="space-y-3">
        <LaporanMingguanComponent id_st={params.id_st} />
        <DatahpCheck DataLHP={DataLHP} NHPMAP={NHPMAP} />
      </div>
    </AuthRoleWrapper>
  );
};

export default ViewSuratTugas;
