'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { useGetNamePKPT, useGetNameUser } from '@/hooks/useGetName';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';
import { HiPaperAirplane } from 'react-icons/hi';
import { Badge } from 'flowbite-react';

interface PropsComponent {
  title: string;
  todo: string;
}

const axiosSecvice = new AxiosService();

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
      item.no_tglsp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNameStatusPKPT(item.id_pkpt)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getNameAreaPengawasan(item.id_pkpt)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.bulan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.program_audit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNameUser(Number(item.id_user))
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  const { user } = useAuthStore();
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

                <Badge
                  color={
                    getNameStatusPKPT(item.id_pkpt) == 'pkpt'
                      ? 'indigo'
                      : 'green'
                  }
                >
                  {getNameStatusPKPT(item.id_pkpt)}
                </Badge>
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
                    width="16"
                    height="16"
                  />
                  {getNameUser(Number(item.id_user))}
                </p>
              </Link>
              <p>{item.created_at}</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCreateReport(item.id_st)}
                  className="p-2 border border-blue-500 text-black rounded-md hover:bg-blue-600 hover:text-white flex gap-3 justify-start items-center"
                >
                  <HiPaperAirplane /> <p>|| Buat laporan</p>
                </button>
                <Link
                  href={`/dashboard/${todo}/${item.id_st}`}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center text-sm"
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
    </>
  );
};

export default MapDataST;
