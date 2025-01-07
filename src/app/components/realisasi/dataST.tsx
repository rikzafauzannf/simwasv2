'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { useGetNamePKPT, useGetNameUser } from '@/hooks/useGetName';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

interface PropsComponent {
  title: string;
  todo: string;
}

const MapDataST = ({ title, todo }: PropsComponent) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { getNameStatusPKPT, getNameAreaPengawasan } = useGetNamePKPT();

  const {
    data: DataST,
    isLoading,
    error,
  } = useFetch<SuratTugasData>('surat_tugas');
  const { getUserPhone, getNameUser } = useGetNameUser();

  // Search filter
  const filteredData = DataST.filter(
    (item) =>
      item.program_audit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no_tglsp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const { user } = useAuthStore();
  if (!user || !['Pelaksana', 'Auditor'].includes(user.role as string))
    return null;

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari Nomor Sp/Program Audit..."
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="grid md:grid-cols-3 gap-3">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <h1>{item.no_tglsp}</h1>
                <p>{getNameStatusPKPT(item.id_pkpt)}</p>
              </div>
              <p>{getNameAreaPengawasan(item.id_pkpt)}</p>
              <hr />
              <h1>
                {item.bulan} - {item.program_audit}
              </h1>

              <Link
                href={`https://wa.me/${getUserPhone(item.id_pkpt)}`}
                target="blank"
              >
                <p className="flex justify-start items-center gap-2">
                  <Icon
                    icon="solar:user-check-line-duotone"
                    width="24"
                    height="24"
                  />
                  {getNameUser(Number(item.id_user))}
                </p>
              </Link>
              <p>{item.created_at}</p>
              <hr className="mb-3" />
              <div className="flex flex-col gap-2">
                <Link
                  href={`/dashboard/${todo}/${item.id_st}`}
                  className="py-1 px-3 w-full border border-green-600 text-slate-900 rounded-md text-center font-semibold hover:bg-slate-500/50"
                >
                  {title}
                </Link>
                {/* <button
                onClick={() => handleReportClick(item.tim)}
                className='py-1 px-3 w-full bg-green-600 text-white rounded-md text-center font-semibold'
              >
                Buat Laporan Mingguan
              </button> */}
              </div>
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

export default MapDataST;
