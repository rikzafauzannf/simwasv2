'use client';

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPen,
  FaPaperclip,
  FaPenFancy,
  FaTrashRestore,
} from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { useFetch } from '@/hooks/useFetch';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameUser,
} from '@/hooks/useGetName';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';
import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

const axiosService = new AxiosService();

interface PropsStatus {
  status?: string;
}

const TablePKPT: React.FC<PropsStatus> = ({ status = 'pkpt' }) => {
  const { user } = useAuthStore();
  const {
    data: DataPKPT,
    isLoading,
    error,
    refetch,
  } = useFetch<PKPTDataBase>('pkpt');

  const dataPKPTStatus = DataPKPT.filter(
    (itemsFilter) => itemsFilter.status === status
  );

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<PKPTDataBase[]>([]);

  const { getNameJenisPengawasan } = useGetNameJenisPengawasan();
  const { getNameRuangLingkup } = useGetNameRuangLingkup();
  const { getNameUser } = useGetNameUser();
  const { getNameJenisLaporan } = useGetNameJenisLaporan();

  async function handleDelete(id: number) {
    try {
      const result = await Swal.fire({
        title: 'Apakah anda yakin?',
        text: 'Data yang dihapus tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Menghapus...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await axiosService.deleteData(`/pkpt/${id}`);

        await Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');

        await refetch();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menghapus data.';

      await Swal.fire('Error!', errorMessage, 'error');
      console.error('Error deleting data:', error);
    }
  }

  const columns: TableColumn<PKPTDataBase>[] = [
    {
      name: 'Actions',
      cell: (row: PKPTDataBase) => (
        <div className="flex gap-2">
          <Link
            href={`/dashboard/pkpt/${row.id_pkpt}`}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          {user?.role === 'Perencana' ||
            (user?.role === 'Developer' && (
              <>
                <Link
                  href={`/dashboard/pkpt/actions/${row.id_pkpt}`}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <FaPenFancy />
                </Link>

                <button
                  onClick={() => handleDelete(row.id_pkpt)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <FaTrashRestore />
                </button>

                {/* <button

                onClick={() => handleCreateReport(row.id_pkpt)}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <FaPaperclip />
              </button> */}
              </>
            ))}
        </div>
      ),
      // grow: 0.2,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      grow: 0.2,
    },
    {
      name: 'Create At',
      selector: (row) => formatToLocalDate(row.created_at),
      sortable: true,
      // grow: 0.5,
    },
    {
      name: 'Jenis Pengawasan',
      selector: (row) => getNameJenisPengawasan(row.id_jenis_pengawasan),
      sortable: true,
    },
    {
      name: 'Area Pengawasan',
      selector: (row) => row.area_pengawasan,
      sortable: true,
    },
    {
      name: 'Ruang Lingkup',
      selector: (row) => getNameRuangLingkup(row.id_ruang_lingkup),
      sortable: true,
    },
    {
      name: 'Tujuan / Sasaran',
      selector: (row) => row.tujuan_sasaran,
      sortable: true,
    },
    {
      name: 'Rencana Penugasan',
      selector: (row) => formatToLocalDate(row.rmp_pkpt),
      sortable: true,
    },
    {
      name: 'Rencana Penerbitan',
      selector: (row) => formatToLocalDate(row.rpl_pkpt),
      sortable: true,
    },
    {
      name: 'HP Penanggung Jawab',
      selector: (row) => row.penanggung_jawab,
      sortable: true,
    },
    {
      name: 'HP Wakil Penanggung Jawab',
      selector: (row) => row.wakil_penanggung_jawab,
      sortable: true,
    },
    {
      name: 'HP Pengendali Teknis / Supervisor',
      selector: (row) => row.pengendali_teknis,
      sortable: true,
    },
    {
      name: 'HP Ketua TIM',
      selector: (row) => row.ketua_tim,
      sortable: true,
    },
    {
      name: 'HP Anggota TIM',
      selector: (row) => row.anggota_tim,
      sortable: true,
    },
    {
      name: 'Total HP',
      selector: (row) => row.jumlah,
      sortable: true,
    },

    {
      name: 'TIM',
      selector: (row) => row.tim.split('|').join('\n'),
      sortable: true,
    },
    {
      name: 'Jumlah',
      selector: (row) => row.jumlah,
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row) =>
        `${row.jumlah_laporan} - ${getNameJenisLaporan(row.id_jenis_laporan)}`,
      sortable: true,
    },
    {
      name: 'Anggaran',
      selector: (row) => formatCurrency(Number(row.anggaran)),
      sortable: true,
    },
    {
      name: 'Sarana dan Prasarana',
      selector: (row) => row.sarana_prasarana,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row) => row.keterangan,
      sortable: true,
      maxWidth: '170px',
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (dataPKPTStatus) {
      const filtered = dataPKPTStatus.filter(
        (item) =>
          item.area_pengawasan.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const exportToCSV = () => {
    if (!dataPKPTStatus) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = dataPKPTStatus.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: PKPTDataBase
          ) => string | number;
          return `"${selector(row)}"`;
        })
        .join(',')
    );

    const blob = new Blob([`${headers}\n${csvData.join('\n')}`], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'pkpt_data.csv');
  };

  const exportToExcel = () => {
    if (!dataPKPTStatus) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = dataPKPTStatus.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: PKPTDataBase
          ) => string | number;
          return selector(row);
        })
        .join('\t')
    );

    const blob = new Blob([`${headers}\n${excelData.join('\n')}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'pkpt_data.xls');
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center w-full gap-2">
          <h3 className="capitalize">Data {status}</h3>
          <div className="space-x-2">
            <Link
              href={`/dashboard/pkpt/preview/${status}`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Preview Table
            </Link>
            {/* <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Export CSV
            </button> */}
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Export Excel
            </button>
          </div>
        </div>
        <input
          id="search"
          type="text"
          placeholder="Cari Status / Jenis / Area Pengawasan ..."
          value={search}
          onChange={handleSearch}
          className="border border-b-2 border-t-0 border-l-0 border-r-0 rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : dataPKPTStatus}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
          responsive
          style={{ tableLayout: 'auto' }}
        />
      </div>
    </>
  );
};

export default TablePKPT;
