import { CardComponents } from '@/app/components/Global/Card';
import { Table } from 'flowbite-react';
import React from 'react';

const TableHeader = () => {
    return (
      <thead className="bg-gray-200">
        <tr className="text-center align-middle">
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            No.
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Area Pengawasan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Jenis Pengawasan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Tujuan/Sasaran
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2} colSpan={3}>
            Runga Lingkup
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" colSpan={2}>
            Jadwal
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Tim
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2} colSpan={2}>
            Jumlah Laporan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Keterangan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Jumlah Surat Tugas
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Bulan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Program Audit/Kegiatan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            No./TGL SP
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Waktu Penugasan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Tim Pemeriksa/Pelaksana Kegiatan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Pengendali Teknis/Supervisor
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Ketua Tim
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Anggota Tim
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Jumlah Objek Pengawasan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            Jumlah Laporan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase" rowSpan={2}>
            No./TGL LHP/LHE/LHR
          </td>
        </tr>
        <tr className="text-center align-middle">
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase">
            Rencana Mulai Penugasan
          </td>
          <td className="border border-gray-300 p-2 font-bold text-[11px] whitespace-nowrap uppercase">
            Pencana Penerbitan Laporan
          </td>
        </tr>
      </thead>
    );
  };
  

const RealisasiPKPTPage = () => {
  return (
    <div className="space-y-4">
      <CardComponents>
        <h1>Data Realisasi</h1>
      </CardComponents>
      <CardComponents>
        <div className="grid gap-3">
          <div className="w-full text-center">
            <h1>REALISASI PROGRAM KERJA PENGAWASAN TAHUNAN</h1>
            <h2>PENYELENGGARAAN PEMERINTAHAN DAERAH</h2>
            <p>S/D BULAN AGUSTUS 2024</p>
          </div>
          <div className="w-full overflow-auto">
            <Table className="w-full">
              <TableHeader />
              <tbody >
                <tr className='hover:bg-gray-100'>
                <td className='border border-gray-300 p-2 text-center text-[11px]' rowSpan={4}>1</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima ullam reiciendis.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, architecto!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4} colSpan={2}>Lorem, ipsum dolor.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>1</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem ipsum dolor sit amet consectetur.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>lhe</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' rowSpan={4}>11</td>
                {/* st */}
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum dolor.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, numquam!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, eos est!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >
                    <ul className='list-none gap-1'>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </td>
                </tr>
                <tr>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum dolor.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, numquam!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, eos est!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >
                    <ul className='list-none gap-1'>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </td>
                
                </tr>
                <tr>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum dolor.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, numquam!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, eos est!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >
                    <ul className='list-none gap-1'>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </td>
                
                </tr>
                <tr>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem, ipsum dolor.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, numquam!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px] whitespace-nowrap' >Lorem ipsum dolor sit amet.</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, eos est!</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >11</td>
                <td className='border border-gray-300 p-2 text-start text-[11px]' >
                    <ul className='list-none gap-1'>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </td>
                
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </CardComponents>
    </div>
  );
};

export default RealisasiPKPTPage;
