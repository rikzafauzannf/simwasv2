'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import { ButtonLinkComponent } from '../Global/Button';
import Link from 'next/link';
import ReportForm from '../pelaksanaan/form/ReportForm';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';


const MapDataST= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dataDummy = [
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
    {
      jenis_pengawasan: 'internal',
      tim: 1,
    },
  ];

  // Search filter
  const filteredData = dataDummy.filter((item) =>
    item.jenis_pengawasan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // const handleReportClick = (id: number) => {
  //   console.log('Button clicked for ID:', id);
  //   Swal.fire({
  //     title: 'Buat Laporan Mingguan',
  //     html: `<div id="report-form"></div>`,
  //     showCancelButton: true,
  //     confirmButtonText: 'Kirim',
  //     preConfirm: () => {
  //       const form = document.getElementById('report-form') as HTMLDivElement;
  //       const reportForm = <ReportForm id={id} />;
  //       ReactDOM.render(reportForm, form);
  //     },
  //   });
  // };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari Nomor St..."
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="grid md:grid-cols-4 gap-3">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <h1>{item.jenis_pengawasan}</h1>
            <p>{item.tim}</p>
            <hr className="mb-3" />
            <div className="flex flex-col gap-2">
              <Link href={`/pelaksanaan/kendalimutu/form/1`} className='py-1 px-3 w-full border border-green-600 text-slate-900 rounded-md text-center font-semibold hover:bg-slate-500/50'>Buat Kendali Mutu / Laporan</Link>
              {/* <button
                onClick={() => handleReportClick(item.tim)}
                className='py-1 px-3 w-full bg-green-600 text-white rounded-md text-center font-semibold'
              >
                Buat Laporan Mingguan
              </button> */}
            </div>
          </CardComponents>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MapDataST;
