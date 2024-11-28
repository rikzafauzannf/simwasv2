'use client';

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';

const TableSuratTugas = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<SuratTugasData[]>([]);

  const columns = [
    {
      name: 'Actions',
      cell: (row: SuratTugasData) => (
        <div className="flex gap-2">
          <Link
            // onClick={() => handleView(row)}
            href={`/perencanaan/surattugas/${row.id}`}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          {/* <Link
            href={'/perencanaan/pkpt/actions/1'}
            className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
          >
            Act
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
      name: 'Bulan',
      selector: (row: SuratTugasData) => row.bulan,
      sortable: true,
    },
    {
      name: 'No/Tgl.Sp',
      selector: (row: SuratTugasData) => row.noTglSp,
      sortable: true,
    },
    {
      name: 'Program Audit',
      selector: (row: SuratTugasData) => row.programAudit,
      sortable: true,
    },
    {
      name: 'Tim Pemeriksa',
      selector: (row: SuratTugasData) => row.timPemeriksa,
      sortable: true,
    },
    {
      name: 'Irban',
      selector: (row: SuratTugasData) => row.irban,
      sortable: true,
    },
    {
      name: 'Pengendali Teknis',
      selector: (row: SuratTugasData) => row.pengendaliTeknis,
      sortable: true,
    },
    {
      name: 'Ketua Tim',
      selector: (row: SuratTugasData) => row.ketuaTim,
      sortable: true,
    },
    {
      name: 'Tim',
      selector: (row: SuratTugasData) => row.Tim,
      sortable: true,
    },
    {
      name: 'Jumlah Obejek',
      selector: (row: SuratTugasData) => row.jumlahObjek,
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row: SuratTugasData) => row.jumlahLaporan,
      sortable: true,
    },
    {
      name: 'No.Tgl.LHP/LHE/LHR',
      selector: (row: SuratTugasData) => row.noTglLhp,
      sortable: true,
    },
    {
      name: 'Jenis Audit',
      selector: (row: SuratTugasData) => row.jenisAudit,
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row: SuratTugasData) => row.keterangan,
      sortable: true,
    },
    {
      name: 'Link ST',
      selector: (row: SuratTugasData) => row.linkSt,
      sortable: true,
    },
    {
      name: 'File ST',
      selector: (row: SuratTugasData) => row.fileSt,
      sortable: true,
    },
  ];

  const data: SuratTugasData[] = [
    {
      id:1,
    bulan:"string",
    noTglSp:"string",
    programAudit:"string",
    timPemeriksa:"string",
    irban:"string",
    pengendaliTeknis:"string",
    ketuaTim:"string",
    Tim:"string",
    jumlahObjek:12,
    jumlahLaporan:20,
    noTglLhp:"string",
    jenisAudit:"string",
    keterangan:"string",
    fileSt:"string",
    linkSt:"string",
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = data.filter(
      (item) =>
        item.noTglSp.toLowerCase().includes(value.toLowerCase()) ||
        item.programAudit.toLowerCase().includes(value.toLowerCase())
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
            const selector = col.selector as (row: SuratTugasData) => string | number;
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
            const selector = col.selector as (row: SuratTugasData) => string | number;
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
          <h3>Table Rekap Surat Tugas</h3>
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
export default TableSuratTugas;
