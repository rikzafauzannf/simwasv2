'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import { ButtonLinkComponent } from '../Global/Button';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import {
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameUser,
} from '@/hooks/useGetName';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { Badge } from 'flowbite-react';
import { formatToLocalDate } from '@/data/formatData';

interface Props {
  todo: string;
  title: string;
}

const MapDataPkpt: React.FC<Props> = ({ todo, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: DataPKPT = [],
    isLoading,
    error,
  } = useFetch<PKPTDataBase>('pkpt');
  const { getNameJenisPengawasan } = useGetNameJenisPengawasan();
  const { getNameUser, getUserPhone } = useGetNameUser();
  const { getNameRuangLingkup } = useGetNameRuangLingkup();

  const filteredData = DataPKPT.filter(
    (item) =>
      item.area_pengawasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const { user } = useAuthStore();
  if (
    !user ||
    !['Perencana', 'Pelaksana', 'Audotor', 'Developer','JFA'].includes(
      user.role as string
    )
  )
    return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari jenis pengawasan / area..."
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <div className="space-y-2">
              <Badge color={item.status === 'pkpt' ? 'indigo' : 'green'}>
                {item.status}
              </Badge>

              <h1 className="font-semibold text-lg text-wrap break-words">
                {item.area_pengawasan}
              </h1>

              <p className="text-sm">
                {getNameJenisPengawasan(item.id_jenis_pengawasan)}
              </p>

              <div className="flex flex-col lg:flex-row justify-between gap-2">
                <p className="flex items-center gap-1 text-sm">
                  <Icon
                    icon="solar:buildings-3-line-duotone"
                    width="16"
                    height="16"
                  />
                  {getNameRuangLingkup(item.id_ruang_lingkup)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-slate-100 rounded-md shadow-sm text-sm gap-2">
                <Link
                  href={`https://wa.me/${getUserPhone(item.id_user)}`}
                  target="_blank"
                  className="flex items-center gap-1"
                >
                  <Icon
                    icon="solar:user-check-line-duotone"
                    width="16"
                    height="16"
                  />
                  {getNameUser(Number(item.id_user))}
                </Link>
                <small>{formatToLocalDate(item.created_at)}</small>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href={`/dashboard/${todo}/${item.id_pkpt}`}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center text-sm"
                >
                  {item.status} || {title}
                </Link>
              </div>
            </div>
          </CardComponents>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 bg-blue-500 text-white"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50 bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MapDataPkpt;
