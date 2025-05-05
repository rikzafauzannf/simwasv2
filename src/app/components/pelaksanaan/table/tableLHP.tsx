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
  useGetNameRuangLingkup,
  useGetNameST,
  useGetNameUser,
} from '@/hooks/useGetName';
import { LHPData } from '@/interface/interfaceHasilPengawasan';
import Swal from 'sweetalert2';
import { AxiosService } from '@/services/axiosInstance.service';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

const axiosSecvice = new AxiosService();

const TableLHP: React.FC = () => {
  const { user } = useAuthStore();
  const hashPermission = ['Pelaksana', 'Auditor', 'Developer','JFA'].includes(
    user?.role as string
  );

  const { data: DataLHP, isLoading, error, refetch } = useFetch<LHPData>('lhp');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<LHPData[]>([]);

  const { getNameUser } = useGetNameUser();
  const { getNameNoSP, getProgramAudit } = useGetNameST();

  const handleDelete = async (id: number) => {
    if (!hashPermission) return;

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
        await axiosSecvice.deleteData(`lhp/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'There was an error deleting the file.', 'error');
      }
    }
  };

  const columns: TableColumn<LHPData>[] = [
    {
      name: 'Actions',
      cell: (row: LHPData) => (
        <div className="flex gap-2">
          <Link
            href={row.file_lhp}
            target="blank"
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </Link>
          {hashPermission && (
            <button
              onClick={() => handleDelete(row.id_lhp)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          )}
        </div>
      ),
    },
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
      name: 'Nomor LHP',
      selector: (row) => row.no_lhp,
      sortable: true,
    },
    {
      name: 'Keterangan LHP',
      selector: (row) => row.keterangan_lhp,
      sortable: true,
    },
    {
      name: 'Perancang LHP',
      selector: (row) => getNameUser(row.id_user),
      sortable: true,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (DataLHP) {
      const filtered = DataLHP.filter(
        (item) =>
          item.keterangan_lhp.toLowerCase().includes(value.toLowerCase()) ||
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
    if (!DataLHP) return;

    const headers = columns
      .filter((col) => col.name !== 'Actions')
      .map((col) => col.name)
      .join(',');

    const csvData = DataLHP.map((row) =>
      columns
        .filter((col) => col.name !== 'Actions')
        .map((col) => {
          const selector = col.selector as unknown as (
            row: LHPData
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

  return (
    <>
      <div className="mb-4 space-y-2">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-2">
          <h3>Data LHP</h3>
          <div className="space-x-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Export CSV
            </button>
          </div>
        </div>
        <input
          id="search"
          type="text"
          placeholder="Cari Data LHP"
          value={search}
          onChange={handleSearch}
          className="border rounded-md shadow-md border-slate-600 text-black bg-slate-200/25 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={search ? filteredData : DataLHP}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="300px"
          responsive
        />
      </div>
    </>
  );
};

export default TableLHP;
