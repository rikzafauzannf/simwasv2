'use client';
import React from 'react';
import { CardComponents } from '@/app/components/Global/Card';
import { useFetchAll } from '@/hooks/useFetchAll';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { Table } from 'flowbite-react';
import {
  useGetNameJenisLaporan,
  useGetNameJenisPengawasan,
  useGetNameRuangLingkup,
  useGetNameTingkatResiko,
  useGetNameUser,
} from '@/hooks/useGetName';
import { formatCurrency } from '@/data/formatData';
import { sum } from 'lodash';
import { JenisPengawasanDB } from '@/interface/interfaceReferensi';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import PdfGenerator from '@/app/components/PDFGenerator';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Types
interface TableHooks {
  getNameUser: (id: number) => string;
  getNameTingkatResiko: (id: number) => string;
  getNameRuangLingkup: (id: number) => string;
  getNameJenisLaporan: (id: number) => string;
  getNameJenisPengawasan: (id: number) => string;
}

// Constants
const EXCEL_HEADER_STYLE = {
  alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
  font: { bold: true },
  border: {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
  }
};

// Excel Export Functions
const createExcelWorksheet = (data: PKPTDataBase[], jenisPengawasanData: JenisPengawasanDB[], hooks: TableHooks) => {
  const headers = [
    [
      { v: 'NO', s: EXCEL_HEADER_STYLE },
      { v: 'Area Pengawasan', s: EXCEL_HEADER_STYLE },
      { v: 'Jenis Pengawasan', s: EXCEL_HEADER_STYLE },
      { v: 'Tujuan/Sasaran', s: EXCEL_HEADER_STYLE },
      { v: 'Ruang Lingkup', s: EXCEL_HEADER_STYLE },
      { v: 'Jadwal', s: EXCEL_HEADER_STYLE },
      { v: 'Hari Penugasan', s: EXCEL_HEADER_STYLE },
      { v: 'TIM', s: EXCEL_HEADER_STYLE },
      { v: 'Anggaran', s: EXCEL_HEADER_STYLE },
      { v: 'Jumlah Laporan', s: EXCEL_HEADER_STYLE },
      { v: 'Sarana dan Prasarana', s: EXCEL_HEADER_STYLE },
      { v: 'Tingkat Resiko', s: EXCEL_HEADER_STYLE },
      { v: 'Keterangan', s: EXCEL_HEADER_STYLE }
    ]
  ];

  const subHeaders = [
    ['(1)', '(2)', '(3)', '(4)', '(5)', '(6)', '(7)', '(8)', '(9)', '(10)', '(11)', '(12)']
  ];

  const wsData = [...headers, ...subHeaders];

  jenisPengawasanData.forEach((jenisPengawasan, index) => {
    const filteredData = data.filter(
      item => item.id_jenis_pengawasan === jenisPengawasan.id_jenis_pengawasan
    );

    // Add jenis pengawasan header with styling
    wsData.push([{
      v: `${String.fromCharCode(65 + index)}. ${jenisPengawasan.jenis_pengawasan}`,
      s: { ...EXCEL_HEADER_STYLE}
    }]);

    // Add data rows
    filteredData.forEach((item, idx) => {
      wsData.push([
        String(idx + 1),
        item.area_pengawasan,
        hooks.getNameJenisPengawasan(item.id_jenis_pengawasan),
        item.tujuan_sasaran,
        hooks.getNameRuangLingkup(item.id_ruang_lingkup),
        `${item.rmp_pkpt} - ${item.rpl_pkpt}`,
        `PJ: ${item.penanggung_jawab}\nWPJ: ${item.wakil_penanggung_jawab}\nDalnis: ${item.pengendali_teknis}\nKT: ${item.ketua_tim}\nAT: ${item.anggota_tim}`,
        item.tim.split(',').map(id => hooks.getNameUser(Number(id))).join(', '),
        formatCurrency(item.anggaran),
        String(item.jumlah_laporan),
        item.sarana_prasarana,
        hooks.getNameTingkatResiko(item.id_tingkat_resiko),
        item.keterangan
      ]);
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Define merged cells
  ws['!merges'] = [
    // Header row merges
    { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // NO
    { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // Area Pengawasan
    { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // Jenis Pengawasan
    { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // Tujuan/Sasaran
    { s: { r: 0, c: 4 }, e: { r: 0, c: 6 } }, // Ruang Lingkup
    { s: { r: 0, c: 7 }, e: { r: 0, c: 8 } }, // Jadwal
    { s: { r: 0, c: 9 }, e: { r: 0, c: 14 } }, // Hari Penugasan
  ];

  // Set column widths
  ws['!cols'] = [
    { width: 5 }, // NO
    { width: 20 }, // Area Pengawasan
    { width: 20 }, // Jenis Pengawasan
    { width: 25 }, // Tujuan/Sasaran
    { width: 20 }, // Ruang Lingkup
    { width: 15 }, // Jadwal
    { width: 30 }, // Hari Penugasan
    { width: 25 }, // TIM
    { width: 15 }, // Anggaran
    { width: 15 }, // Jumlah Laporan
    { width: 20 }, // Sarana dan Prasarana
    { width: 15 }, // Tingkat Resiko
    { width: 20 }, // Keterangan
  ];

  return ws;
};

const exportToExcel = (data: PKPTDataBase[], jenisPengawasanData: JenisPengawasanDB[], hooks: TableHooks) => {
  const ws = createExcelWorksheet(data, jenisPengawasanData, hooks);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PKPT Data');

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `PKPT_Report_${new Date().getFullYear()}.xlsx`);
};

// Table Components
const TableHeader: React.FC = () => (
  <thead className="bg-gray-200">
    <tr className="text-center align-middle">
      <th className="border border-gray-300 p-2" rowSpan={2}>NO</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Area Pengawasan</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Jenis Pengawasan</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Tujuan/Sasaran</th>
      <th className="border border-gray-300 p-2" rowSpan={2} colSpan={3}>Ruang Lingkup</th>
      <th className="border border-gray-300 p-2" colSpan={2}>Jadwal</th>
      <th className="border border-gray-300 p-2" colSpan={6}>Hari Penugasan</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>TIM</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Anggaran</th>
      <th className="border border-gray-300 p-2" rowSpan={2} colSpan={3}>Jumlah Laporan</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Sarana dan Prasarana</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Tingkat Resiko</th>
      <th className="border border-gray-300 p-2" rowSpan={2}>Keterangan</th>
    </tr>
    <tr>
      <th className="border border-gray-300 p-2">Rencana Mulai Penugasan</th>
      <th className="border border-gray-300 p-2">Rencana Penerbitan Laporan</th>
      <th className="border border-gray-300 p-2">Penanggung Jawab</th>
      <th className="border border-gray-300 p-2">Wakil Penanggung Jawab</th>
      <th className="border border-gray-300 p-2">Dalnis/Supervisor</th>
      <th className="border border-gray-300 p-2">Ketua Tim</th>
      <th className="border border-gray-300 p-2">Anggota Tim</th>
      <th className="border border-gray-300 p-2">Jumlah</th>
    </tr>
  </thead>
);

const TablePKPT: React.FC = () => {
  const { data: DataPKPT } = useFetchAll<PKPTDataBase>('pkpt');
  const { data: DataJenisPengawasan } = useFetchAll<JenisPengawasanDB>('jenis_pengawasan');
  
  const hooks = {
    getNameUser: useGetNameUser().getNameUser,
    getNameTingkatResiko: useGetNameTingkatResiko().getNameTingkatResiko,
    getNameRuangLingkup: useGetNameRuangLingkup().getNameRuangLingkup,
    getNameJenisLaporan: useGetNameJenisLaporan().getNameJenisLaporan,
    getNameJenisPengawasan: useGetNameJenisPengawasan().getNameJenisPengawasan,
  };

  return (
    <div className="overflow-x-auto">
      <Table border={1} className="min-w-full border-collapse border border-gray-300 text-left">
        <TableHeader />
        <tbody>
          {DataJenisPengawasan.map((jenisPengawasan, index) => {
            const filteredPKPT = DataPKPT.filter(
              pkpt => pkpt.id_jenis_pengawasan === jenisPengawasan.id_jenis_pengawasan
            );

            return (
              <React.Fragment key={jenisPengawasan.id_jenis_pengawasan}>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-2 font-bold" colSpan={23}>
                    {`${String.fromCharCode(65 + index)}. ${jenisPengawasan.jenis_pengawasan}`}
                  </td>
                </tr>
                {filteredPKPT.map((item, idx) => (
                  <tr key={item.id_pkpt} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 p-2">{item.area_pengawasan}</td>
                    <td className="border border-gray-300 p-2">
                      {hooks.getNameJenisPengawasan(item.id_jenis_pengawasan)}
                    </td>
                    <td className="border border-gray-300 p-2">{item.tujuan_sasaran}</td>
                    <td className="border border-gray-300 p-2" colSpan={3}>
                      {hooks.getNameRuangLingkup(item.id_ruang_lingkup)}
                    </td>
                    <td className="border border-gray-300 p-2">{item.rmp_pkpt}</td>
                    <td className="border border-gray-300 p-2">{item.rpl_pkpt}</td>
                    <td className="border border-gray-300 p-2">{item.penanggung_jawab}</td>
                    <td className="border border-gray-300 p-2">{item.wakil_penanggung_jawab}</td>
                    <td className="border border-gray-300 p-2">{item.pengendali_teknis}</td>
                    <td className="border border-gray-300 p-2">{item.ketua_tim}</td>
                    <td className="border border-gray-300 p-2">{item.anggota_tim}</td>
                    <td className="border border-gray-300 p-2">{item.jumlah}</td>
                    <td className="border border-gray-300 p-2">
                      {item.tim.split(',').map(id => hooks.getNameUser(Number(id))).join(', ')}
                    </td>
                    <td className="border border-gray-300 p-2">{formatCurrency(item.anggaran)}</td>
                    <td className="border border-gray-300 p-2" colSpan={3}>{item.jumlah_laporan}</td>
                    <td className="border border-gray-300 p-2">{item.sarana_prasarana}</td>
                    <td className="border border-gray-300 p-2">
                      {hooks.getNameTingkatResiko(item.id_tingkat_resiko)}
                    </td>
                    <td className="border border-gray-300 p-2">{item.keterangan}</td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

const PKPTPage: React.FC = () => {
  const { data: DataPKPT } = useFetchAll<PKPTDataBase>('pkpt');
  const { data: DataJenisPengawasan } = useFetchAll<JenisPengawasanDB>('jenis_pengawasan');
  
  const hooks = {
    getNameUser: useGetNameUser().getNameUser,
    getNameTingkatResiko: useGetNameTingkatResiko().getNameTingkatResiko,
    getNameRuangLingkup: useGetNameRuangLingkup().getNameRuangLingkup,
    getNameJenisLaporan: useGetNameJenisLaporan().getNameJenisLaporan,
    getNameJenisPengawasan: useGetNameJenisPengawasan().getNameJenisPengawasan,
  };

  const handleExportExcel = () => {
    exportToExcel(DataPKPT, DataJenisPengawasan, hooks);
  };

  return (
    <AuthRoleWrapper allowedRoles={['Admin', 'Perencana', 'Pimpinan', 'Pelaksana', 'Auditor']}>
      <div className="space-y-4">
        <CardComponents>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h5 className="text-xl font-bold mb-2">Program Kerja Pengawasan Tahunan (PKPT)</h5>
              <p className="text-gray-600">Inspektorat Daerah Kota Tasikmalaya</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportExcel}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Export Excel
              </button>
            </div>
          </div>
        </CardComponents>

        <CardComponents>
          <PdfGenerator>
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold">PROGRAM KERJA PENGAWASAN TAHUNAN (PKPT)</h1>
                <h2 className="text-xl font-bold">INSPEKTORAT DAERAH KOTA TASIKMALAYA</h2>
                <h3 className="text-lg font-bold">TAHUN {new Date().getFullYear()}</h3>
              </div>
              <TablePKPT />
            </div>
          </PdfGenerator>
        </CardComponents>
      </div>
    </AuthRoleWrapper>
  );
};

export default PKPTPage;