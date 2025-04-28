'use client';
import React, { useState, useMemo } from 'react';
import { CardComponents } from '../Global/Card';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { useGetNameST, useGetNameUser } from '@/hooks/useGetName';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LHPData } from '@/interface/interfaceHasilPengawasan';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { HiPencilAlt } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';

interface Props {
  todo: string;
  title: string;
}
const axiosSecvice = new AxiosService();
const MapDataLHP: React.FC<Props> = ({ todo, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: DataLHP, isLoading, error } = useFetch<LHPData>('lhp');
  const { data: DataTemuan } = useFetch<TemuanHasilData>('temuan_hasil');

  const { getNameUser, getUserPhone } = useGetNameUser();
  const { getNameNoSP, getProgramAudit } = useGetNameST();

  // Filter LHP data to only show items that don't have corresponding entries in temuan_hasil
  const filteredLHP = useMemo(() => {
    // Create a set of id_lhp values from temuan_hasil for faster lookups
    const temuanLhpIds = new Set(DataTemuan.map((temuan) => temuan.id_lhp));

    // Return only LHP items that don't have their id_lhp in the temuan_hasil data
    return DataLHP.filter((lhp) => !temuanLhpIds.has(lhp.id_lhp));
  }, [DataLHP, DataTemuan]);

  // Search filter
  const searchFilteredData = filteredLHP.filter(
    (item) =>
      item.keterangan_lhp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no_lhp.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  const currentItems = searchFilteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(searchFilteredData.length / itemsPerPage);
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
          placeholder="Cari Data LHP"
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <p className="font-bold text-blue-600">
          Menampilkan {searchFilteredData.length} LHP yang belum memiliki temuan
          hasil
        </p>
      </div>
      <section className="grid md:grid-cols-3 gap-8">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <p>
              ST: <b className="text-blue-500">{getNameNoSP(item.id_st)}</b>
            </p>
            <p>{getProgramAudit(item.id_st)}</p>
            <hr />
            <p>
              Nomor LHP : <b className="text-blue-500">{item.no_lhp}</b>
            </p>
            <p>Uraian : {item.keterangan_lhp}</p>
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
            <div className="flex flex-col gap-2">
            <button
                  onClick={() => handleCreateReport(item.id_st)}
                  className="p-2 border border-blue-500 text-black rounded-md hover:bg-blue-600 hover:text-white flex gap-3 justify-start items-center"
                >
                  <HiPaperAirplane /> <p> || Buat laporan Harian / Mingguna</p>
                </button>
              <Link
                href={`/dashboard/${todo}/${item.id_lhp}`}
                className="py-2 px-3 w-full border border-violet-600 text-slate-900 rounded-md text-center font-reguler hover:bg-violet-700 hover:text-white"
              >
                {title}
              </Link>
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
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MapDataLHP;
