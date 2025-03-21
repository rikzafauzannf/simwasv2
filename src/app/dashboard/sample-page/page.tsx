'use client';
import React, { useRef } from 'react';
import { CardComponents } from '@/app/components/Global/Card';
import { useFetchAll } from '@/hooks/useFetchAll';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { Table } from 'flowbite-react';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameTingkatResiko,
  useGetNameUser,
} from '@/hooks/useGetName';
import { formatCurrency } from '@/data/formatData';
import { sum } from 'lodash';

interface TableToPrintProps {
  DataPKPT: PKPTDataBase[];
}

const TableToPrint: React.FC<TableToPrintProps> = ({ DataPKPT }) => {
  const { getNameUser } = useGetNameUser();
  const { getNameTingkatResiko } = useGetNameTingkatResiko();
  const { getNameRuangLingkup } = useGetNameRuangLingkup();
  const { getNameJenisLaporan } = useGetNameJenisLaporan();
  const { getNameJenisPengawasan } = useGetNameJenisPengawasan();

  return (
    <Table
      border={1}
      className="min-w-full border-collapse border border-gray-300 text-left"
    >
      <thead className="bg-gray-200">
        <tr className="text-center align-middle">
          <th className="border border-gray-300 p-2" rowSpan={2}>
            NO
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Area Pengawasan
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Jenis Pengawasan
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Tujuan/Sasaran
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2} colSpan={3}>
            Ruang Lingkup
          </th>
          <th className="border border-gray-300 p-2" colSpan={2}>
            Jadwal
          </th>
          <th className="border border-gray-300 p-2" colSpan={6}>
            Hari Penugasan
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            TIM
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Anggaran
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2} colSpan={3}>
            Jumlah Laporan
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Sarana dan Prasarana
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Tingkat Resiko
          </th>
          <th className="border border-gray-300 p-2" rowSpan={2}>
            Keterangan
          </th>
        </tr>
        <tr>
          <th className="border border-gray-300 p-2">
            Rencana Mulai Penugasan
          </th>
          <th className="border border-gray-300 p-2">
            Rencana Penerbitan Laporan
          </th>
          <th className="border border-gray-300 p-2">Penanggung Jawab</th>
          <th className="border border-gray-300 p-2">Wakil Penanggung Jawab</th>
          <th className="border border-gray-300 p-2">Dalnis/Supervisor</th>
          <th className="border border-gray-300 p-2">Ketua Tim</th>
          <th className="border border-gray-300 p-2">Anggota Tim</th>
          <th className="border border-gray-300 p-2">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 text-center align-middle">
          <td className="border border-gray-300 p-2">(1)</td>
          <td className="border border-gray-300 p-2">(2)</td>
          <td className="border border-gray-300 p-2">(3)</td>
          <td className="border border-gray-300 p-2">(4)</td>
          <td className="border border-gray-300 p-2" colSpan={3}>
            (5)
          </td>
          <td className="border border-gray-300 p-2" colSpan={2}>
            (6)
          </td>
          <td className="border border-gray-300 p-2" colSpan={6}>
            (7)
          </td>
          <td className="border border-gray-300 p-2"></td>
          <td className="border border-gray-300 p-2">(8)</td>
          <td className="border border-gray-300 p-2" colSpan={3}>
            (9)
          </td>
          <td className="border border-gray-300 p-2">(10)</td>
          <td className="border border-gray-300 p-2">(11)</td>
          <td className="border border-gray-300 p-2">(12)</td>
        </tr>
        <tr className="hover:bg-gray-100 bg-gray-200">
          <th className="border border-gray-300 p-2">A.</th>
          <th className="border border-gray-300 p-2" colSpan={2}>
            AUDIT KINERJA
          </th>
          {/* <th className='border border-gray-300 p-2'></th> */}
          <th className="border border-gray-300 p-2">{DataPKPT.length}</th>
          <th className="border border-gray-300 p-2" colSpan={2}></th>
          <th className="border border-gray-300 p-2">
            {sum(DataPKPT.map((item) => item.id_ruang_lingkup))}
          </th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2" colSpan={2}>
            {sum(DataPKPT.map((item) => item.jumlah_laporan))}
          </th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
          <th className="border border-gray-300 p-2"></th>
        </tr>
        {DataPKPT.map((item, index) => (
          <tr key={item.id_pkpt} className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2 text-center">
              {index + 1}
            </td>
            <td className="border border-gray-300 p-2">
              {item.area_pengawasan}
            </td>
            <td className="border border-gray-300 p-2">
              {getNameJenisPengawasan(item.id_jenis_pengawasan)}
            </td>
            <td className="border border-gray-300 p-2">
              {item.tujuan_sasaran}
            </td>
            <td className="border border-gray-300 p-2" colSpan={2}>
              {getNameRuangLingkup(item.id_ruang_lingkup)}
            </td>
            <td className="border border-gray-300 p-2">1</td>
            <td className="border border-gray-300 p-2">{item.rmp_pkpt}</td>
            <td className="border border-gray-300 p-2">{item.rpl_pkpt}</td>
            <td className="border border-gray-300 p-2">
              {item.penanggung_jawab}
            </td>
            <td className="border border-gray-300 p-2">
              {item.wakil_penanggung_jawab}
            </td>
            <td className="border border-gray-300 p-2">
              {item.pengendali_teknis}
            </td>
            <td className="border border-gray-300 p-2">{item.ketua_tim}</td>
            <td className="border border-gray-300 p-2">{item.anggota_tim}</td>
            <td className="border border-gray-300 p-2">{item.jumlah}</td>
            <td className="border border-gray-300 p-2">
              {item.tim
                .split(',')
                .map((id) => getNameUser(Number(id)))
                .join(', ')}
            </td>
            <td className="border border-gray-300 p-2">
              {formatCurrency(Number(item.anggaran))}
            </td>
            <td className="border border-gray-300 p-2" colSpan={2}>
              {item.jumlah_laporan}
            </td>
            <td className="border border-gray-300 p-2">
              {getNameJenisLaporan(item.id_jenis_laporan)}
            </td>
            <td className="border border-gray-300 p-2">
              {item.sarana_prasarana}
            </td>
            <td className="border border-gray-300 p-2">
              {getNameTingkatResiko(item.id_tingkat_resiko)}
            </td>
            <td className="border border-gray-300 p-2">{item.keterangan}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const SamplePage: React.FC = () => {
  const { data: DataPKPT } = useFetchAll<PKPTDataBase>('pkpt');
  const componentRef = useRef<HTMLDivElement | null>(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <h5 className="card-title mb-3">Sample Page</h5>
        <p className="card-subtitle">This is a sample page</p>
        {/* <button className="btn btn-primary" onClick={() => handlePrint()}>Print Table</button>         */}
      </div>

      <CardComponents>
        <div className="overflow-x-auto">
          <div ref={componentRef}>
            <TableToPrint DataPKPT={DataPKPT} />
          </div>
        </div>
      </CardComponents>
    </>
  );
};

export default SamplePage;
