'use client';
import React, { useState } from 'react';
import { CardComponents } from '../Global/Card';
import { ButtonLinkComponent } from '../Global/Button';

interface Props {
  todo: string;
}

const MapDataPkpt: React.FC<Props> = ({ todo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dataDummy = [
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:1,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },
    {
      id:2,
      area_pengawasan:"Area Pengawasan",
      jenis_pengawasan:"Jenis Pengawasan"
    },    
  ];

  // Search filter
  const filteredData = dataDummy.filter((item) =>
    item.jenis_pengawasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.area_pengawasan.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari jenis pengawasan / area..."
          className="w-full p-2 border rounded-md mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="grid md:grid-cols-4 gap-3">
        {currentItems.map((item, index) => (
          <CardComponents key={index}>
            <h1>#{item.area_pengawasan}</h1>
            <p>{item.jenis_pengawasan}</p>
            <hr className="mb-3" />
            <ButtonLinkComponent
              Text="Buat ST"
              linkTo={`/dashboard/${todo}/${item.id}`}
            />
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

export default MapDataPkpt;
