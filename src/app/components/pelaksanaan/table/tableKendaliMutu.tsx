'use client';

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { KendaliMutuData } from '@/interface/interfaceKendaliMutu';

const TableKendaliMutu = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<KendaliMutuData[]>([]);

  const columns = [
    // {
    //   name: 'Actions',
    //   cell: (row: KendaliMutuData) => (
    //     <div className="flex gap-2">
    //       <Link
    //         // onClick={() => handleView(row)}
    //         href={`/perencanaan/surattugas/${row.id}`}
    //         className="p-2 text-blue-500 hover:text-blue-700"
    //       >
    //         <FaEye />
    //       </Link>
    //       {/* <Link
    //         href={'/perencanaan/pkpt/actions/1'}
    //         className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
    //       >
    //         Act
    //       </Link> */}
    //       {/* <button
    //         onClick={() => handleEdit(row)}
    //         className="p-2 text-yellow-500 hover:text-yellow-700"
    //       >
    //         <FaEdit />
    //       </button>
    //       <button
    //          onClick={() => {
    //            setSelectedRow(row);
    //            setShowDeleteDialog(true);
    //          }}
    //         className="p-2 text-red-500 hover:text-red-700"
    //       >
    //         <FaTrash />
    //       </button> */}
    //     </div>
    //   ),
    // },
    {
      name: 'Kartu Penugasan',
      selector: (row: KendaliMutuData) => row.kartuPenugasan,
      sortable: true,
    },
    {
      name: 'Program Kerja Pengawasan',
      selector: (row: KendaliMutuData) => row.programKerja,
      sortable: true,
    },
    {
      name: 'Notulensi Kesepakatan',
      selector: (row: KendaliMutuData) => row.notulensiKesepakatan,
      sortable: true,
    },
    {
      name: 'Kertas Kerja Pengawasan',
      selector: (row: KendaliMutuData) => row.kertasKerja,
      sortable: true,
    },
    {
      name: 'Dokumentasi Pemeriksaan',
      selector: (row: KendaliMutuData) => row.dokumentasiPemeriksaan,
      sortable: true,
    },
    {
      name: 'Reviu Supervisi',
      selector: (row: KendaliMutuData) => row.riviuSupervisor,
      sortable: true,
    },
    {
      name: 'Ceklis Penyelesaian',
      selector: (row: KendaliMutuData) => row.ceklisPenyelesaian,
      sortable: true,
    },
    {
      name: 'Link GDrive',
      selector: (row: KendaliMutuData) => row.linkDrive,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row: KendaliMutuData) => row.keterangan,
      sortable: true,
    },
  ];

  const data: KendaliMutuData[] = [
    {
      id: 1,
      kertasKerja: 'string',
      kartuPenugasan: 'string',
      programKerja: 'string',
      notulensiKesepakatan: 'string',
      dokumentasiPemeriksaan: 'string',
      riviuSupervisor: 'string',
      ceklisPenyelesaian: 'string',
      linkDrive: 'string',
      keterangan: 'string',
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = data.filter(
      (item) =>
        item.kartuPenugasan.toLowerCase().includes(value.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(value.toLowerCase())
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
            const selector = col.selector as (
              row: KendaliMutuData
            ) => string | number;
            return `"${selector(row)}"`; // Wrap in quotes to handle commas in content
          })
          .join(',');
      })
      .join('\n');

    const blob = new Blob([`${headers}\n${csvData}`], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'kendalimutu_data.csv');
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
            const selector = col.selector as (
              row: KendaliMutuData
            ) => string | number;
            return selector(row);
          })
          .join('\t');
      })
      .join('\n');

    const blob = new Blob([`${headers}\n${excelData}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'kendalimutu_data.xls');
  };

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3>Table Rekap Kedali Mutu</h3>
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
export default TableKendaliMutu;
