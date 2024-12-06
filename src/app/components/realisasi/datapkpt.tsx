'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import { ButtonLinkComponent } from '../Global/Button';
import Link from 'next/link';

interface Props {
  todo: string;
}

const MapDataPkpt: React.FC<Props> = ({ todo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dataDummy = [
    {
      id: 1,
      area_pengawasan:
        'Audit Kinerja Program Pembinaan Keluarga Berencana (KB)',
      jenis_pengawasan: 'Audit Kinerja',
    },
    {
      id: 2,
      area_pengawasan:
        'Pemeriksaan atas Penyelenggaraan Urusan Pemerintahan Bidang KUMKM',
      jenis_pengawasan: 'Audit Ketaatan',
    },
    {
      id: 3,
      area_pengawasan:
        'Audit Ketaatan Program Pemberdayaan Masyarakat Desa dan Kelurahan ',
      jenis_pengawasan: 'Audit Ketaatan',
    },
    {
      id: 4,
      area_pengawasan:
        'Pemberian Keterangan Ahli pada Proses Penyelidikan / Penyidikan / Persidangan Tindak Pidana Korupsi',
      jenis_pengawasan: 'Audit Dengan Tujuan Tertentu',
    },
    {
      id: 5,
      area_pengawasan:
        'Reviu atas Sisa Dana DAK Non Fisik  Bantuan Operasional Kesehatan (BOK) Pada Dinas Kesehatan',
      jenis_pengawasan: 'Reviu',
    },
    {
      id: 6,
      area_pengawasan:
        'Reviu Laporan Realisasi DAK Fisik Tahun Sebelumnya pada Perangkat Daerah Inspektur Pembantu III',
      jenis_pengawasan: 'Reviu',
    },
    {
      id: 7,
      area_pengawasan:
        'Penilaian Pembangunan Zona Integritas pada DPMPTSP, Bapenda, Disdukcapil, dan UPTD Puskesmas Urug',
      jenis_pengawasan: 'Assurance - Penilaian / Evaluasi',
    },
    {
      id: 8,
      area_pengawasan:
        'Monitoring, Evaluasi dan Verifikasi Penyelesaian Kerugian Negara / Daerah Hasil Pemeriksaan BPK / Eksternal Lainnya Triwulan II',
      jenis_pengawasan: 'Assurance - Evaluasi',
    },
    {
      id: 9,
      area_pengawasan: 'Area Pengawasan',
      jenis_pengawasan: 'Jenis Pengawasan',
    },
    {
      id: 10,
      area_pengawasan: 'Area Pengawasan',
      jenis_pengawasan: 'Jenis Pengawasan',
    },
    {
      id: 11,
      area_pengawasan: 'Area Pengawasan',
      jenis_pengawasan: 'Jenis Pengawasan',
    },
    {
      id: 12,
      area_pengawasan: 'Area Pengawasan',
      jenis_pengawasan: 'Jenis Pengawasan',
    },
    {
      id: 13,
      area_pengawasan: 'Area Pengawasan',
      jenis_pengawasan: 'Jenis Pengawasan',
    },
    {
      id: 14,
      area_pengawasan: 'Area Pengawasan',
      jenis_pengawasan: 'Jenis Pengawasan',
    },
  ];

  // Search filter
  const filteredData = dataDummy.filter(
    (item) =>
      item.jenis_pengawasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.area_pengawasan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari jenis pengawasan / area..."
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="grid md:grid-cols-4 gap-8">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <h1># {item.area_pengawasan}</h1>
            <p>{item.jenis_pengawasan}</p>
            <hr className="mb-3" />
            <div className="flex flex-col gap-2">
              <Link
                href={`/dashboard/${todo}/${item.id}`}
                className="py-2 px-3 w-full border border-violet-600 text-slate-900 rounded-md text-center font-reguler hover:bg-violet-700 hover:text-white"
              >
                Buat ST
              </Link>
              {/* <button
                onClick={() => handleReportClick(item.tim)}
                className="py-1 px-3 w-full bg-green-600 text-white rounded-md text-center font-semibold"
              >
                Buat Laporan Mingguan
              </button> */}
            </div>
          </CardComponents>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MapDataPkpt;
