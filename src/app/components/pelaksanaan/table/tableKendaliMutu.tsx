'use client';

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { KendaliMutuData } from '@/interface/interfaceKendaliMutu';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useGetNamePKPT } from '@/hooks/useGetName';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';

const axiosService = new AxiosService();

const TableKendaliMutu = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<KendaliMutuData[]>([]);

  const { getNameAreaPengawasan, getNameStatusPKPT } = useGetNamePKPT();

  const columns: TableColumn<KendaliMutuData>[] = [
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <Link
            // onClick={() => handleView(row)}
            href={row.link_google_drive}
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
          </button> */}
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
    {
      name: 'Status PKPT',
      selector: (row) => getNameStatusPKPT(row.id_pkpt),
      sortable: true,
    },
    {
      name: 'Area Pengawasan',
      selector: (row) => getNameAreaPengawasan(row.id_pkpt),
      sortable: true,
    },
    {
      name: 'Kartu Penugasan',
      selector: (row) =>
        String(row.kartu_penugasan) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    {
      name: 'Program Kerja Pengawasan',
      selector: (row) =>
        String(row.program_kerja_pengawasan) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    {
      name: 'Notulensi Kesepakatan',
      selector: (row) =>
        String(row.notulensi_kesepakatan) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    {
      name: 'Kertas Kerja Pengawasan',
      selector: (row) =>
        String(row.kertas_kerja_pengawasan) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    {
      name: 'Dokumentasi Pemeriksaan',
      selector: (row) =>
        String(row.dokumentasi_pemeriksaan) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    {
      name: 'Reviu Supervisi',
      selector: (row) =>
        String(row.reviu_supervisi) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    {
      name: 'Ceklis Penyelesaian',
      selector: (row) =>
        String(row.ceklis_penyelesaian) === 'true' ? 'Ada' : 'Tidak Ada',
      sortable: true,
    },
    // {
    //   name: 'Link GDrive',
    //   selector: (row) => row.link_google_drive,
    //   sortable: true,
    // },
    // {
    //   name: 'Keterangan',
    //   selector: (row) => row.keterangan,
    //   sortable: true,
    // },
  ];

  const { data: DataKendaliMutu, refetch } =
    useFetchAll<KendaliMutuData>('kendali_mutu');
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
        await axiosService.deleteData(`kendali_mutu/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'There was an error deleting the file.', 'error');
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (DataKendaliMutu) {
      const filtered = DataKendaliMutu.filter((item) =>
        item.id_no_tg.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const exportToCSV = () => {
    if (!DataKendaliMutu) return;
    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataKendaliMutu.map((row) => {
      return columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as (
            row: KendaliMutuData
          ) => string | number;
          return `"${selector(row)}"`; // Wrap in quotes to handle commas in content
        })
        .join(',');
    }).join('\n');

    const blob = new Blob([`${headers}\n${csvData}`], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'kendalimutu_data.csv');
  };

  const exportToExcel = () => {
    if (!DataKendaliMutu) return;
    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = DataKendaliMutu.map((row) => {
      return columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as (
            row: KendaliMutuData
          ) => string | number;
          return selector(row);
        })
        .join('\t');
    }).join('\n');

    const blob = new Blob([`${headers}\n${excelData}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'kendalimutu_data.xls');
  };

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center w-full gap-2">
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
          data={search ? filteredData : DataKendaliMutu}
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
