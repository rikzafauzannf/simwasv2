'use client';

import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { FirestoreService } from '@/services/firestore.service';

const TablePKPT: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<PKPTDataBase[]>([]);
  const [DataPKPT, setDataPKPT] = useState<PKPTDataBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestoreService = new FirestoreService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await firestoreService.getAllData('pkpt');
        if (response.success && response.data) {
          const datapkpt = response.data as PKPTDataBase[];
          setDataPKPT(datapkpt);
          setError(null);
        } else {
          setError(new Error(response.message));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn<PKPTDataBase>[] = [
    {
      name: 'Actions',
      cell: (row: PKPTDataBase) => (
        <div className="flex gap-2">
          <Link
            href={`/perencanaan/pkpt/${row.id}`}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          <Link
            href={`/perencanaan/pkpt/actions/${row.id}`}
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
      name: 'Jenis Pengawasan',
      selector: (row) => row.jenis_pengawasan,
      sortable: true,
    },
    {
      name: 'Area Pengawasan',
      selector: (row) => row.area_pengawasan,
      sortable: true,
    },
    {
      name: 'Ruang Lingkup',
      selector: (row) => row.ruang_lingkup,
      sortable: true,
    },
    {
      name: 'Tujuan / Sasaran',
      selector: (row) => row.tujuan_sasaran,
      sortable: true,
    },
    {
      name: 'Rencana Penugasan',
      selector: (row) => row.rencana_penugasan,
      sortable: true,
    },
    {
      name: 'Rencana Penerbitan',
      selector: (row) => row.rencana_penerbitan,
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
      selector: (row) => {
        if (!row.tim || !Array.isArray(row.tim)) return '';
        return row.tim.map(member => member.name).join(', ');
      },
      sortable: true,
    },
    {
      name: 'Jumlah',
      selector: (row) => row.jumlah,
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row) => row.jumlah_laporan,
      sortable: true,
    },
    {
      name: 'Anggaran',
      selector: (row) => row.anggaran,
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
          item.jenis_pengawasan.toLowerCase().includes(value.toLowerCase()) ||
          item.ketua_tim.toLowerCase().includes(value.toLowerCase())
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
          const selector = (col.selector as unknown) as (row: PKPTDataBase) => string | number;
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
          const selector = (col.selector as unknown) as (row: PKPTDataBase) => string | number;
          return selector(row);
        })
        .join('\t')
    );

    const blob = new Blob([`${headers}\n${excelData.join('\n')}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'pkpt_data.xls');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
