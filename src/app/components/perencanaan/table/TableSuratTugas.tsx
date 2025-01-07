'use client';

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { useFetch } from '@/hooks/useFetch';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useFetchById } from '@/hooks/useFetchById';
import { useGetNameJenisAudit, useGetNameUser } from '@/hooks/useGetName';
import { AxiosService } from '@/services/axiosInstance.service';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

interface PropsOptions {
  id_pkpt?: number;
  filterID?: string;
}

const axiosSecvice = new AxiosService();

const TableSuratTugas = ({ id_pkpt, filterID }: PropsOptions) => {
  const { user } = useAuthStore();
  const hashPermission = ['Perencana'].includes(user?.role as string);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<SuratTugasData[]>([]);
  const { data: DataSuratTugas, refetch } =
    useFetchAll<SuratTugasData>('surat_tugas');

  const { getNameUser } = useGetNameUser();
  const { getNameJenisAudit } = useGetNameJenisAudit();

  const DataST =
    filterID === 'true'
      ? DataSuratTugas.filter((item) => item.id_pkpt === Number(id_pkpt))
      : DataSuratTugas;
  console.log('data by id_pkpt : ', DataST);

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
        await axiosSecvice.deleteData(`surat_tugas/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'There was an error deleting the file.', 'error');
      }
    }
  };

  const columns = [
    {
      name: 'Actions',
      cell: (row: SuratTugasData) => (
        <div className="flex gap-2">
          <Link
            // onClick={() => handleView(row)}
            href={`/dashboard/perencanaan/surattugas/${row.id_st}`}
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
          {hashPermission && (
            <button
              onClick={() => handleDelete(row.id_st)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          )}
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
      selector: (row: SuratTugasData) => row.no_tglsp,
      sortable: true,
    },
    {
      name: 'Program Audit',
      selector: (row: SuratTugasData) => row.program_audit,
      sortable: true,
    },
    {
      name: 'Tim Pemeriksa',
      selector: (row: SuratTugasData) => getNameUser(Number(row.tim_pemeriksa)),
      sortable: true,
    },
    {
      name: 'Irban',
      selector: (row: SuratTugasData) =>
        getNameUser(Number(row.wk_penanggung_jawab)),
      sortable: true,
    },
    {
      name: 'Pengendali Teknis',
      selector: (row: SuratTugasData) =>
        getNameUser(Number(row.pengendali_teknis)),
      sortable: true,
    },
    {
      name: 'Ketua Tim',
      selector: (row: SuratTugasData) => getNameUser(Number(row.ketua_tim)),
      sortable: true,
    },
    {
      name: 'Anggota Tim',
      selector: (row: SuratTugasData) =>
        row.anggota_tim
          .split(',')
          .map((id) => getNameUser(Number(id)))
          .join(', '),
      sortable: true,
    },
    {
      name: 'Jumlah Obejek',
      selector: (row: SuratTugasData) => row.jumlah_objek,
      sortable: true,
    },
    {
      name: 'Jumlah Laporan',
      selector: (row: SuratTugasData) => row.jumlah_laporan,
      sortable: true,
    },
    {
      name: 'No.Tgl.LHP/LHE/LHR',
      selector: (row: SuratTugasData) => row.no_tgllh,
      sortable: true,
    },
    {
      name: 'Jenis Audit',
      selector: (row: SuratTugasData) =>
        getNameJenisAudit(Number(row.id_jenis_audit)),
      sortable: true,
    },
    {
      name: 'Keterangan',
      selector: (row: SuratTugasData) => row.keterangan,
      sortable: true,
    },
    // {
    //   name: 'Link ST',
    //   selector: (row: SuratTugasData) => row.link_st,
    //   sortable: true,
    // },
    {
      name: 'File ST',
      selector: (row: SuratTugasData) => row.link_st,
      sortable: true,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = DataST.filter(
      (item) =>
        item.no_tglsp.toLowerCase().includes(value.toLowerCase()) ||
        item.program_audit.toLowerCase().includes(value.toLowerCase()) ||
        item.no_tgllh.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const exportToCSV = () => {
    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataST.map((row) => {
      return columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as (
            row: SuratTugasData
          ) => string | number;
          return `"${selector(row)}"`; // Wrap in quotes to handle commas in content
        })
        .join(',');
    }).join('\n');

    const blob = new Blob([`${headers}\n${csvData}`], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, 'surat_tugas_data.csv');
  };

  const exportToExcel = () => {
    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join('\t');

    const excelData = DataST.map((row) => {
      return columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as (
            row: SuratTugasData
          ) => string | number;
          return selector(row);
        })
        .join('\t');
    }).join('\n');

    const blob = new Blob([`${headers}\n${excelData}`], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    });
    saveAs(blob, 'surat_tugas_data.xls');
  };

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center w-full gap-2">
          <h3>Table Rekap Surat Tugas</h3>
          <div className="space-x-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Export CSV
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
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
          data={search ? filteredData : DataST}
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
