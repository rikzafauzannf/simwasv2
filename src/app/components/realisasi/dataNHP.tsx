'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import { ButtonLinkComponent } from '../Global/Button';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import {
  useGetNameJenisPengawasan,
  useGetNameST,
  useGetNameUser,
} from '@/hooks/useGetName';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NHPData } from '@/interface/interfaceHasilPengawasan';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { HiPaperAirplane } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';

interface Props {
  todo: string;
}
const axiosSecvice = new AxiosService();
const MapDataNHP: React.FC<Props> = ({ todo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: DataNHP, isLoading, error } = useFetch<NHPData>('nhp');
  const { getNameUser, getUserPhone } = useGetNameUser();
  const { getNameNoSP, getProgramAudit } = useGetNameST();

  // Search filter
  const filteredData = DataNHP.filter(
    (item) =>
      item.keterangan_nhp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNameNoSP(item.id_st)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getProgramAudit(item.id_st)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getNameUser(item.id_user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const { user } = useAuthStore();
  const handleCreateReport = async (id_st: number) => {
    Swal.fire({
      title: 'Buat Laporan Mingguan',
      html: `
        <input id="nomor" class="swal2-input" placeholder="Nomor Laporan"/>        
        <textarea id="reportContent" class="swal2-textarea" placeholder="Isi Laporan"></textarea>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const nomor = (document.getElementById('nomor') as HTMLInputElement)
          .value;
        const content = (
          document.getElementById('reportContent') as HTMLTextAreaElement
        ).value;
        if (!content || !nomor) {
          Swal.showValidationMessage('Silakan isi semua field');
          return;
        }
        return { content, id_st, nomor };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Logika untuk menyimpan laporan
        const dataForm = {
          id_st: id_st,
          id_user: String(user?.id_user),
          id_no: String(result.value.nomor),
          laporan_mingguan: String(result.value.content),
        };
        try {
          const response = await axiosSecvice.addData(
            '/laporan_mingguan',
            dataForm
          );
          console.log('Laporan:', response);
          Swal.fire('Laporan berhasil dibuat!', '', 'success');
        } catch (error) {
          console.error('Error creating report:', error);
          Swal.fire('Gagal membuat laporan!', '', 'error');
        }
      }
    });
  };

  if (
    !user ||
    !['Pelaksana', 'Auditor', 'Developer'].includes(user.role as string)
  )
    return null;
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari Data NHP"
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="grid md:grid-cols-3 gap-8">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <p>ST:</p>
            <h1>{getNameNoSP(item.id_st)}</h1>
            <p>{getProgramAudit(item.id_st)}</p>
            <hr />
            <h1>Nomor NHP : {item.no_nhp}</h1>
            <p>Keterangan : {item.keterangan_nhp}</p>
            <hr />
            <Link
              href={`https://wa.me/${getUserPhone(item.id_user)}`}
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
              <button
                onClick={() => handleCreateReport(item.id_st)}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex gap-3 justify-start items-center"
              >
                <HiPaperAirplane /> <p>|| Buat laporan</p>
              </button>
              <Link
                href={`/dashboard/${todo}/${item.id_nhp}`}
                className="py-2 px-3 w-full border border-violet-600 text-slate-900 rounded-md text-center font-reguler hover:bg-violet-700 hover:text-white"
              >
                Buat LHP
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

export default MapDataNHP;
