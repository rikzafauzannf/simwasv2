'use client';

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
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

const TablePKPT: React.FC = () => {
  const { data: DataPKPT, isLoading, error } = useFetch<PKPTDataBase>('pkpt');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<PKPTDataBase[]>([]);

  const { getNameJenisPengawasan } = useGetNameJenisPengawasan();
  const { getNameRuangLingkup } = useGetNameRuangLingkup();
  const { getNameUser } = useGetNameUser();
  const { getNameJenisLaporan } = useGetNameJenisLaporan();

  const columns: TableColumn<PKPTDataBase>[] = [
    {
      name: 'Actions',
      cell: (row: PKPTDataBase) => (
        <div className="flex gap-2">
          <Link
            href={`/dashboard/perencanaan/pkpt/${row.id_pkpt}`}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          <Link
            href={`/dashboard/perencanaan/pkpt/actions/${row.id_pkpt}`}
            className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black"
          >
            Act
          </Link>
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Create At',
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: 'Jenis Pengawasan',
      selector: (row) => getNameJenisPengawasan(row.id_jenis_laporan),
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
      selector: (row) => row.rmp_pkpt,
      sortable: true,
    },
    {
      name: 'Rencana Penerbitan',
      selector: (row) => row.rpl_pkpt,
      sortable: true,
    },
    {
      name: 'Penanggung Jawab',
      selector: (row) => row.penanggung_jawab,
      sortable: true,
    },
    {
      name: 'Wakil Penanggung Jawab',
      selector: (row) => row.wakil_penanggung_jawab,
      sortable: true,
    },
    {
      name: 'Pengendali Teknis / Supervisor',
      selector: (row) => row.pengendali_teknis,
      sortable: true,
    },
    {
      name: 'Ketua TIM',
      selector: (row) => row.ketua_tim,
      sortable: true,
    },
    {
      name: 'TIM',
      selector: (row) =>
        row.tim
          .split(',')
          .map((id) => getNameUser(Number(id)))
          .join(', '),
      // selector: (row) => {
      //   if (!row.tim || !Array.isArray(row.tim)) return '';
      //   return row.tim.map((member) => member.name).join(', ');
      // },
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
      selector: (row) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.anggaran),
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
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (DataPKPT) {
      const filtered = DataPKPT.filter(
        (item) =>
          item.area_pengawasan.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const exportToCSV = () => {
    if (!DataPKPT) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataPKPT.map((row) =>
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
    if (!DataPKPT) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = DataPKPT.map((row) =>
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
          placeholder="Cari Status / Jenis / Area Pengawasan ..."
          value={search}
          onChange={handleSearch}
          className="border border-b-2 border-t-0 border-l-0 border-r-0 rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : DataPKPT}
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
