'use client';

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameST,
  useGetNameTemuanHasil,
  useGetNameUser,
} from '@/hooks/useGetName';
import { LHPData } from '@/interface/interfaceHasilPengawasan';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';
import { RekapTemuanDB } from '@/interface/interfaceRekapTemuan';
import { formatCurrency } from '@/hooks/formatCurrency';

const axiosSecvice = new AxiosService();

const TableRekapTemuan: React.FC = () => {
  const {
    data: DataRekapTemuan,
    isLoading,
    error,
    refetch,
  } = useFetch<RekapTemuanDB>('rekap_temuan');
  const { getNameKondisiTemuan } = useGetNameTemuanHasil();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<RekapTemuanDB[]>([]);

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
        await axiosSecvice.deleteData(`rekap_temuan/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'There was an error deleting the file.', 'error');
      }
    }
  };

  const columns: TableColumn<RekapTemuanDB>[] = [
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          {/* <Link
            // href={`/dashboard/perencanaan/pkpt/${row.id_nhp}`}
            href={row.file_lhp}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link> */}
          {/* <Link
            href={`/dashboard/pelaporan/lembarhasil/actions/${row.id_lhp}`}
            className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
          >
            Act
          </Link> */}
          <button
            onClick={() => handleDelete(row.id_rekap_temuan)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
    {
      name: 'Create At',
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: 'Kondisi Temuan',
      selector: (row) => getNameKondisiTemuan(row.id_tlhp),
      sortable: true,
    },
    {
      name: 'Jumlah Kejadian',
      selector: (row) => row.jumlah_kejadian,
      sortable: true,
    },
    {
      name: 'Nilai Temuan',
      selector: (row) => formatCurrency(row.nilai_rp),
      sortable: true,
    },
    {
      name: 'Persentase',
      selector: (row) => `${row.persentase}%`,
      sortable: true,
    },
    {
      name: 'Perancang NHP',
      selector: (row) => getNameUser(row.id_user),
      sortable: true,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (DataRekapTemuan) {
      const filtered = DataRekapTemuan.filter(
        (item) =>
          item.id_tlhp ||
          item.jumlah_kejadian ||
          item.nilai_rp ||
          item.persentase ||
          item.created_at.toLowerCase().includes(value.toLowerCase()) ||
          getNameUser(item.id_user).toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const exportToCSV = () => {
    if (!DataRekapTemuan) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataRekapTemuan.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: RekapTemuanDB
          ) => string | number;
          return `"${selector(row)}"`;
        })
        .join(',')
    );

    const blob = new Blob([`${headers}\n${csvData.join('\n')}`], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'rekap_temuan.csv');
  };

  const exportToExcel = () => {
    if (!DataRekapTemuan) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = DataRekapTemuan.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: RekapTemuanDB
          ) => string | number;
          return selector(row);
        })
        .join('\t')
    );

    const blob = new Blob([`${headers}\n${excelData.join('\n')}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'rekap_temuan.xls');
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center w-full gap-2">
          <h3>Data Rekap Temuan</h3>
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
          placeholder="Cari Data Rekap Temuan"
          value={search}
          onChange={handleSearch}
          className="border border-b-2 border-t-0 border-l-0 border-r-0 rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : DataRekapTemuan}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
          responsive
        />
      </div>
    </>
  );
};

export default TableRekapTemuan;
