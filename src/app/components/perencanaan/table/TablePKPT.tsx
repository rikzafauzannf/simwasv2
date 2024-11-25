'use client';

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';

interface PKPTData {
  id?: number;
  Status: string;
  JenisPengawasan: string;
  AreaPengawasan: string;
  RuangLingkup: string;
  Tujuan: string;
  RencanaPenugasan: string;
  RencanaPenerbitan: string;
  PenanggungJawab: string;
  WakilPenanggungJawab: string;
  PengendaliTeknis: string;
  KetuaTIM: string;
  TIM: string;
  Jumlah: number;
  Anggaran: number;
  JumlahLaporan: string;
  Saran: string;
  TingkatRisiko: string;
  Keterangan: string;
}
const TablePKPT = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<PKPTData[]>([]);

  const columns = [
    {
      name: 'Actions',
      cell: (row: PKPTData) => (
        <div className="flex gap-2">
          <Link
            // onClick={() => handleView(row)}
            href={'/perencanaan/pkpt/1'}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          <Link
            href={'/perencanaan/pkpt/actions/1'}
            className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
          >
            Act
          </Link>
          {/* <button
            onClick={() => handleEdit(row)}
            className="p-2 text-yellow-500 hover:text-yellow-700"
          >
            <FaEdit />
          </button>
          <button
             onClick={() => {
               setSelectedRow(row);
               setShowDeleteDialog(true);
             }}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button> */}
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row: PKPTData) => row.Status,
      sortable: true,
    },
    {
      name: 'Jenis Pengawasan',
      selector: (row: PKPTData) => row.JenisPengawasan,
      sortable: true,
    },
    {
      name: 'Area Pengawasan',
      selector: (row: PKPTData) => row.AreaPengawasan,
      sortable: true,
    },
    {
      name: 'Ruang Lingkup',
      selector: (row: PKPTData) => row.RuangLingkup,
      sortable: true,
    },
    {
      name: 'Tujuan / Sasaran',
      selector: (row: PKPTData) => row.Tujuan,
      sortable: true,
    },
    {
      name: 'Rencana Penugasan',
      selector: (row: PKPTData) => row.RencanaPenugasan,
      sortable: true,
    },
    {
      name: 'Rencana Penerbitan',
      selector: (row: PKPTData) => row.RencanaPenerbitan,
      sortable: true,
    },
    {
      name: 'Penanggung Jawab',
      selector: (row: PKPTData) => row.PenanggungJawab,
      sortable: true,
    },
    {
      name: 'Wakil Penanggung Jawab',
      selector: (row: PKPTData) => row.WakilPenanggungJawab,
      sortable: true,
    },
    {
      name: 'Pengendali Teknis / Supervisor',
      selector: (row: PKPTData) => row.PengendaliTeknis,
      sortable: true,
    },
    {
      name: 'Ketua TIM',
      selector: (row: PKPTData) => row.KetuaTIM,
      sortable: true,
    },
    {
      name: 'TIM',
      selector: (row: PKPTData) => row.TIM,
      sortable: true,
    },
    {
      name: 'Jumlah',
      selector: (row: PKPTData) => row.Jumlah,
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row: PKPTData) => row.JumlahLaporan,
      sortable: true,
    },
    {
      name: 'Anggaran',
      selector: (row: PKPTData) => row.Anggaran,
      sortable: true,
    },
    {
      name: 'Saran dan Prasarana',
      selector: (row: PKPTData) => row.Saran,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row: PKPTData) => row.Keterangan,
      sortable: true,
    },
  ];

  const data: PKPTData[] = [
    {
      id: 1,
      Status: 'PKPT',
      JenisPengawasan: 'string',
      AreaPengawasan: 'string',
      RuangLingkup: 'string',
      Tujuan: 'string',
      RencanaPenugasan: 'string',
      RencanaPenerbitan: 'string',
      PenanggungJawab: 'string',
      WakilPenanggungJawab: 'string',
      PengendaliTeknis: 'string',
      KetuaTIM: 'string',
      TIM: 'string',
      Jumlah: 12,
      Anggaran: 12,
      JumlahLaporan: 'string',
      Saran: 'string',
      TingkatRisiko: 'string',
      Keterangan: 'string',
    },
    {
      id: 2,
      Status: 'Non-PKPT',
      JenisPengawasan: 'string',
      AreaPengawasan: 'string',
      RuangLingkup: 'string',
      Tujuan: 'string',
      RencanaPenugasan: 'string',
      RencanaPenerbitan: 'string',
      PenanggungJawab: 'string',
      WakilPenanggungJawab: 'string',
      PengendaliTeknis: 'string',
      KetuaTIM: 'string',
      TIM: 'string',
      Jumlah: 12,
      Anggaran: 12,
      JumlahLaporan: 'string',
      Saran: 'string',
      TingkatRisiko: 'string',
      Keterangan: 'string',
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = data.filter(
      (item) =>
        item.JenisPengawasan.toLowerCase().includes(value.toLowerCase()) ||
        item.KetuaTIM.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const exportToCSV = () => {
    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = data
      .map((row) => {
        return columns
          .filter((col) => col.name !== 'Actions')
          .map((col) => {
            const selector = col.selector as (row: PKPTData) => string | number;
            return `"${selector(row)}"`; // Wrap in quotes to handle commas in content
          })
          .join(',');
      })
      .join('\n');

    const blob = new Blob([`${headers}\n${csvData}`], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'pkpt_data.csv');
  };

  const exportToExcel = () => {
    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = data
      .map((row) => {
        return columns
          .filter((col) => col.name !== 'Actions')
          .map((col) => {
            const selector = col.selector as (row: PKPTData) => string | number;
            return selector(row);
          })
          .join('\t');
      })
      .join('\n');

    const blob = new Blob([`${headers}\n${excelData}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'pkpt_data.xls');
  };

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3>Data PKPT</h3>
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
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border border-b-2 border-t-0 border-l-0 border-r-0 rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
          responsive
        />
      </div>
    </>
  );
};
export default TablePKPT;
