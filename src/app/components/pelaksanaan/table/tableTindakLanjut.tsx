'use client';

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye, FaPencilAlt } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameST,
  useGetNameUser,
} from '@/hooks/useGetName';
import { NHPData } from '@/interface/interfaceHasilPengawasan';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';
import {
  FormTindakLanjut,
  TindakLanjutDB,
} from '@/interface/interfaceTindakLanjut';
import { formatCurrency } from '@/data/formatData';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { TbArrowUpDashed } from 'react-icons/tb';

const axiosSecvice = new AxiosService();

const TableTindakLanjut: React.FC = () => {
  const { user } = useAuthStore();
  const hashPermission = ['Pelaksana', 'Auditor', 'Developer','JFA','OPD'].includes(
    user?.role as string
  );

  const {
    data: DataTindakLanjut,
    isLoading,
    error,
    refetch,
  } = useFetch<TindakLanjutDB>('tindak_lanjut');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<TindakLanjutDB[]>([]);

  const { getNameUser } = useGetNameUser();
  const { getNameNoSP, getProgramAudit } = useGetNameST();

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecvice.deleteData(`tindak_lanjut/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'There was an error deleting the file.', 'error');
      }
    }
  };

  const columns: TableColumn<TindakLanjutDB>[] = [
    ...(hashPermission
      ? [
          {
            name: 'Actions',
            cell: (row: TindakLanjutDB) => (
              <div className="flex gap-2">
                {/* <Link
              // href={`/dashboard/perencanaan/pkpt/${row.id_nhp}`}
              href={row.file_nhp}
              className="p-2 text-blue-500 hover:text-blue-700"
            >
              <FaEye />
            </Link> */}
                {/* <Link
              href={`/dashboard/pelaksanaan/actions/${row.id_nhp}`}
              className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
            >
              Act
            </Link> */}

                <button
                  onClick={() => handleDelete(row.id_tindak_lanjut)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                {row.sisa_nominal !== 0 && (
                  <Link
                    href={`/dashboard/tindaklanjut/update/${row.id_tindak_lanjut}`}
                    className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
                  >
                    <TbArrowUpDashed />
                  </Link>
                )}
              </div>
            ),
          },
        ]
      : []),
    {
      name: 'Create At',
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: 'Uraian TL',
      selector: (row) => row.uraian,
      sortable: true,
    },
    {
      name: 'Nilai Setor',
      selector: (row) => formatCurrency(row.nilai_setor),
      sortable: true,
    },
    {
      name: 'Sisa Nominal',
      selector: (row) => formatCurrency(row.sisa_nominal),
      sortable: true,
    },

    // {
    //   name: 'Kondisi Rekomendasi',
    //   selector: (row) => row.kondisi_rekomendasi,
    //   sortable: true,
    // },

    {
      name: 'Tanggal Pengiriman',
      selector: (row) => row.tanggal_pengiriman,
      sortable: true,
    },
    {
      name: 'Batas Akhir TL',
      selector: (row) => row.batas_akhir_tl,
      sortable: true,
    },
    {
      name: 'Status TL',
      selector: (row) => row.kondisi_temuan,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row) => row.keterangan,
      sortable: true,
    },
    {
      name: 'Perancang Tindak Lanjut',
      selector: (row) => getNameUser(row.id_user),
      sortable: true,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (DataTindakLanjut) {
      const filtered = DataTindakLanjut.filter(
        (item) =>
          item.uraian.toLowerCase().includes(value.toLowerCase()) ||
          item.kondisi_temuan.toLowerCase().includes(value.toLowerCase()) ||
          item.kondisi_rekomendasi
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.created_at.toLowerCase().includes(value.toLowerCase()) ||
          getNameUser(item.id_user).toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const exportToCSV = () => {
    if (!DataTindakLanjut) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataTindakLanjut.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: TindakLanjutDB
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
    if (!DataTindakLanjut) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = DataTindakLanjut.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: TindakLanjutDB
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
          <h3>Data Tindak Lanjut</h3>
          <div className="space-x-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Export CSV
            </button>
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
          placeholder="Cari Data Tindak Lanjut"
          value={search}
          onChange={handleSearch}
          className="border border-b-2 border-t-0 border-l-0 border-r-0 rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : DataTindakLanjut}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
          responsive
        />
      </div>
    </>
  );
};

export default TableTindakLanjut;
