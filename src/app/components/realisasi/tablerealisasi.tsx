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
  JumlahSuratTugas: number;
  Bulan: string;
  ProgramAudit: string;
  NoTgl: string;
  WaktuPenugasan: string;
  TimPelaksanan: string;
  PengendaliTeknis: string;
  KetuaTim: string;
  AnggotaTim: string;
  JumlahObjekPengawasan: number;
  JumlahLaporan: number;
}
const TableRealisasi = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<PKPTData[]>([]);

  const columns = [
    {
      name: 'Actions',
      cell: (row: PKPTData) => (
        <div className="flex gap-2">
          <Link
            // onClick={() => handleView(row)}
            href={'/perencanaan/realisasipkpt/1'}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          {/* <Link
            href={'/perencanaan/realisasipkpt/inputrealisasi/1'}
            className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
          >
            realisasi
          </Link> */}
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
      name: 'Jumlah Surat Tugas',
      selector: (row: PKPTData) => row.JumlahSuratTugas,
      sortable: true,
    },
    {
      name: 'Bulan',
      selector: (row: PKPTData) => row.Bulan,
      sortable: true,
    },
    {
      name: 'Program Audit',
      selector: (row: PKPTData) => row.ProgramAudit,
      sortable: true,
    },
    {
      name: 'No/Tgl.Sp',
      selector: (row: PKPTData) => row.NoTgl,
      sortable: true,
    },
    {
      name: 'Waktu Penugasan',
      selector: (row: PKPTData) => row.WaktuPenugasan,
      sortable: true,
    },
    {
      name: 'Tim Pemeriksa/Pelaksana Kegiatan',
      selector: (row: PKPTData) => row.TimPelaksanan,
      sortable: true,
    },
    {
      name: 'Pengendali Teknis/Supervisor',
      selector: (row: PKPTData) => row.PengendaliTeknis,
      sortable: true,
    },
    {
      name: 'Ketua Tim',
      selector: (row: PKPTData) => row.KetuaTim,
      sortable: true,
    },
    {
      name: 'Anggota Tim',
      selector: (row: PKPTData) => row.AnggotaTim,
      sortable: true,
    },
    {
      name: 'Jumlah Objek Pengawasan',
      selector: (row: PKPTData) => row.JumlahObjekPengawasan,
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row: PKPTData) => row.JumlahLaporan,
      sortable: true,
    },
  ];

  const data: PKPTData[] = [
    {
      id: 1,
      Status: 'PKPT',
      JenisPengawasan: 'string',
      JumlahSuratTugas: 10,
      Bulan: 'November',
      ProgramAudit: 'string',
      NoTgl: '10/12.Sp',
      WaktuPenugasan: 'string',
      TimPelaksanan: 'string',
      PengendaliTeknis: 'string',
      KetuaTim: 'string',
      AnggotaTim: 'string',
      JumlahObjekPengawasan: 12,
      JumlahLaporan: 10,
    },
    {
      id: 2,
      Status: 'Non-PKPT',
      JenisPengawasan: 'string',
      JumlahSuratTugas: 10,
      Bulan: 'November',
      ProgramAudit: 'string',
      NoTgl: '10/12.Sp',
      WaktuPenugasan: 'string',
      TimPelaksanan: 'string',
      PengendaliTeknis: 'string',
      KetuaTim: 'string',
      AnggotaTim: 'string',
      JumlahObjekPengawasan: 12,
      JumlahLaporan: 10,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = data.filter(
      (item) =>
        item.JenisPengawasan.toLowerCase().includes(value.toLowerCase()) ||
        item.Status.toLowerCase().includes(value.toLowerCase())
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
          <h3>Data Hasil Realisasi</h3>
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
export default TableRealisasi;
