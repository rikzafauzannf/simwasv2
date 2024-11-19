'use client';

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { DataPKPT } from '@/middleware/interface/perencanaanPKPT';
import { usePKPTStore } from '@/middleware/Store/usePKPTStore';

const TablePKPT = () => {
  const { pkptData, fetchPKPTData } = usePKPTStore();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<DataPKPT[]>(pkptData || []);

  useEffect(() => {
    fetchPKPTData();
  }, [fetchPKPTData]);

  useEffect(() => {
    setFilteredData(pkptData);
  }, [pkptData]);

  console.log("data PKPT :",pkptData)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = (pkptData || []).filter(
      (item) =>
        (item.jenis_pengawasan || '').toLowerCase().includes(value.toLowerCase()) ||
        (item.ruang_lingkup || '').toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      name: 'Actions',
      cell: (row: DataPKPT) => (
        <div className="flex gap-2">
          <Link href={`/perencanaan/pkpt/${row.id}`} className="p-2 text-blue-500 hover:text-blue-700">
            <FaEye />
          </Link>
          <Link href={'/perencanaan/realisasipkpt/inputrealisasi/1'} className="p-2 bg-primary hover:bg-lightprimary hover:shadow-md rounded-md text-white hover:text-black">
            realisasi
          </Link>
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row: DataPKPT) => row.status || 'N/A',
      sortable: true,
    },
    {
      name: 'Jenis Pengawasan',
      selector: (row: DataPKPT) => row.jenis_pengawasan || 'N/A',
      sortable: true,
    },
    {
      name: 'Area Pengawasan',
      selector: (row: DataPKPT) => row.area_pengawasan || 'N/A',
      sortable: true,
    },
    {
      name: 'Ruang Lingkup',
      selector: (row: DataPKPT) => row.ruang_lingkup || 'N/A',
      sortable: true,
    },
    {
      name: 'Tujuan / Sasaran',
      selector: (row: DataPKPT) => row.tujuan_sasaran || 'N/A',
      sortable: true,
    },
    {
      name: 'Rencana Penugasan',
      selector: (row: DataPKPT) => row.rencana_penugasan || 'N/A',
      sortable: true,
    },
    {
      name: 'Rencana Penerbitan',
      selector: (row: DataPKPT) => row.rencana_penerbitan || 'N/A',
      sortable: true,
    },
    {
      name: 'Penanggung Jawab',
      selector: (row: DataPKPT) => row.penanggung_jawab || 'N/A',
      sortable: true,
    },
    {
      name: 'Wakil Penanggung Jawab',
      selector: (row: DataPKPT) => row.wakil_penanggung_jawab || 'N/A',
      sortable: true,
    },
    {
      name: 'Pengendali Teknis / Supervisor',
      selector: (row: DataPKPT) => row.supervisor || 'N/A',
      sortable: true,
    },
    {
      name: 'Ketua TIM',
      selector: (row: DataPKPT) => row.ketua_tim || 'N/A',
      sortable: true,
    },
    {
      name: 'Anggota TIM',
      selector: (row: DataPKPT) => row.anggota_tim || 'N/A',
      sortable: true,
    },
    {
      name: 'Jumlah',
      selector: (row: DataPKPT) => row.jumlah || 'N/A',
      sortable: true,
    },
    {
      name: 'TIM',
      selector: (row: DataPKPT) => row.tim || 'N/A',
      sortable: true,
    },        
    {
      name: 'Anggaran',
      selector: (row: DataPKPT) => row.anggaran || 'N/A',
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row: DataPKPT) => row.jumlah_laporan || 'N/A',
      sortable: true,
    },
    {
      name: 'Saran dan Prasarana',
      selector: (row: DataPKPT) => row.sarana_prasarana || 'N/A',
      sortable: true,
    },
    {
      name: 'Tingkat Risiko',
      selector: (row: DataPKPT) => row.tingkat_risiko || 'N/A',
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row: DataPKPT) => row.keterangan || 'N/A',
      sortable: true,
    },
  ];

  const data: DataPKPT[] = (pkptData || []).map((item: DataPKPT) => ({
    id: item.id,
    area_pengawasan: item.area_pengawasan,
    jenis_pengawasan: item.jenis_pengawasan,
    ruang_lingkup: item.ruang_lingkup,
    tujuan_sasaran: item.tujuan_sasaran,
    rencana_penugasan: item.rencana_penugasan,
    rencana_penerbitan: item.rencana_penerbitan,
    penanggung_jawab: item.penanggung_jawab,
    wakil_penanggung_jawab: item.wakil_penanggung_jawab,
    supervisor: item.supervisor,
    ketua_tim: item.ketua_tim,
    anggota_tim: item.anggota_tim,
    jumlah: item.jumlah,
    tim: item.tim,
    anggaran: item.anggaran,
    jumlah_laporan: item.jumlah_laporan,
    sarana_prasarana: item.sarana_prasarana,
    tingkat_risiko: item.tingkat_risiko,
    keterangan: item.keterangan,
    id_user: item.id_user,
    createdAt: item.createdAt,
    status: item.status,
    active: item.active,
  }));

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
            const selector = col.selector as (row: DataPKPT) => string | number;
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
            const selector = col.selector as (row: DataPKPT) => string | number;
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
          data={filteredData}
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
