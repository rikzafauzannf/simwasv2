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
  useGetNameKode,
  useGetNameRuangLingkup,
  useGetNameST,
  useGetNameUser,
} from '@/hooks/useGetName';
import { NHPData } from '@/interface/interfaceHasilPengawasan';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { formatCurrency } from '@/hooks/formatCurrency';

const TableTemuanHasil: React.FC = () => {
  const {
    data: DataTemuanHasil,
    isLoading,
    error,
  } = useFetch<TemuanHasilData>('temuan_hasil');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<TemuanHasilData[]>([]);

  const { getNameUser } = useGetNameUser();
  const { getNameNoSP, getProgramAudit } = useGetNameST();
  const { getNameKodeReferensi, getNameKodeRekomendasi, getNameKodeTemuan } =
    useGetNameKode();

  const columns: TableColumn<TemuanHasilData>[] = [
    // {
    //   name: 'Actions',
    //   cell: (row) => (
    //     <div className="flex gap-2">
    //       <Link
    //         // href={`/dashboard/perencanaan/pkpt/${row.id_nhp}`}
    //         href={`${row.id_tlhp}`}
    //         className="p-2 text-blue-500 hover:text-blue-700"
    //       >
    //         <FaEye />
    //       </Link>
    //       <Link
    //         href={`/dashboard/pelaksanaan/actions/${row.id_tlhp}`}
    //         className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
    //       >
    //         Act
    //       </Link>
    //     </div>
    //   ),
    // },
    {
      name: 'Create At',
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: 'No/Tgl SP',
      selector: (row) => getNameNoSP(row.id_st),
      sortable: true,
    },
    {
      name: 'Program Audit',
      selector: (row) => getProgramAudit(row.id_st),
      sortable: true,
    },
    {
      name: 'Uraian',
      selector: (row) => row.uraian,
      sortable: true,
    },
    {
      name: 'Kode Temuan',
      selector: (row) => getNameKodeTemuan(row.id_kode_temuan),
      sortable: true,
    },
    {
      name: 'Kondisi Temuan',
      selector: (row) => row.kondisi_temuan,
      sortable: true,
    },
    {
      name: 'Kode Rekomendasi',
      selector: (row) => getNameKodeRekomendasi(row.id_kode_rekomendasi),
      sortable: true,
    },
    {
      name: 'Rekomendasi/Saran',
      selector: (row) => row.rekomendasi_saran,
      sortable: true,
    },
    {
      name: 'Nilai Rekomendasi',
      selector: (row) => formatCurrency(row.nilai_rekomendasi),
      sortable: true,
    },
    {
      name: 'Kode Referensi',
      selector: (row) => getNameKodeReferensi(row.id_kode_referensi),
      sortable: true,
    },
    {
      name: 'Perancang Temuan Hasil',
      selector: (row) => getNameUser(row.id_user),
      sortable: true,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (DataTemuanHasil) {
      const filtered = DataTemuanHasil.filter(
        (item) =>
          item.uraian.toLowerCase().includes(value.toLowerCase()) ||
          item.kondisi_temuan.toLowerCase().includes(value.toLowerCase()) ||
          item.created_at.toLowerCase().includes(value.toLowerCase()) ||
          getNameNoSP(item.id_st).toLowerCase().includes(value.toLowerCase()) ||
          getProgramAudit(item.id_st)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          getNameUser(item.id_user).toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const exportToCSV = () => {
    if (!DataTemuanHasil) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataTemuanHasil.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: TemuanHasilData
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
    if (!DataTemuanHasil) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = DataTemuanHasil.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: TemuanHasilData
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
        <div className="flex justify-between items-center">
          <h3>Data Temuan Hasil</h3>
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
          placeholder="Cari Data Temuan Hasil"
          value={search}
          onChange={handleSearch}
          className="border border-b-2 border-t-0 border-l-0 border-r-0 rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : DataTemuanHasil}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
          responsive
        />
      </div>
    </>
  );
};

export default TableTemuanHasil;